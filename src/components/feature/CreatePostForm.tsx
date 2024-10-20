import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Box,
  Avatar,
  Image,
  IconButton,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiImage, FiVideo } from "react-icons/fi";
import { postImage, postVideo } from "../../apis/upload.api";

const handleFileChange = (
  files: FileList | null,
  type: string,
  setFiles: (files: File[]) => void
) => {
  if (!files) return [];
  const filteredFiles = Array.from(files).filter((file) =>
    file.type.startsWith(type)
  );
  setFiles(filteredFiles);
};

const AvatarAndName = ({
  avatarUrl,
  name,
}: {
  avatarUrl: string;
  name: string;
}) => (
  <Box display="flex" alignItems="center" mb={4}>
    <Avatar src={avatarUrl} mr={3} />
    <Input value={name} isReadOnly variant="unstyled" />
  </Box>
);

const MediaPreview = ({
  imageFiles,
  videoFile,
}: {
  imageFiles: string[];
  videoFile: string | null;
}) => (
  <>
    <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4} mt={4}>
      {imageFiles.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Uploaded image ${index + 1}`}
          borderRadius="md"
          objectFit="cover"
          maxH="200px"
          width="100%"
        />
      ))}
    </SimpleGrid>
    {videoFile && (
      <Box mt={4}>
        <video controls width="100%" style={{ maxHeight: "300px" }}>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    )}
  </>
);

export default function CreatePostForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postContent, setPostContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const currentUser = { name: "John Doe", avatarUrl: "/your-avatar-url" };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files, "image", setImageFiles);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoFiles = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("video")
    );
    if (videoFiles.length > 0) setVideoFile(videoFiles[0]);
  };

  const submitPost = async () => {
    setLoading(true);
    if (imageFiles && imageFiles.length > 0) {
      const formData = new FormData();

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const imageResponse = await postImage(formData);
        console.log("Image upload successful:", imageResponse);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    } else {
      console.log("No images to upload.");
    }

    if (videoFile) {
      const videoFormData = new FormData();
      videoFormData.append("videos", videoFile);

      try {
        const videoResponse = await postVideo(videoFormData);
        console.log("Video upload successful:", videoResponse);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      console.log("No video to upload.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    setPostContent("");
    setImageFiles([]);
    setVideoFile(null);
    onClose();
  };

  return (
    <>
      <Box
        onClick={onOpen}
        display="flex"
        alignItems="center"
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="sm"
        cursor="pointer"
        mb={5}
      >
        <Avatar src={currentUser.avatarUrl} mr={3} />
        <Input
          placeholder="What's on your mind?"
          bg="gray.100"
          border="none"
          cursor="pointer"
          isReadOnly
        />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={{ base: "full", sm: "md", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <AvatarAndName
              avatarUrl={currentUser.avatarUrl}
              name={currentUser.name}
            />

            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              minH={{ base: "100px", md: "120px" }}
              bg="gray.100"
              border="none"
              resize="none"
            />

            <HStack spacing={4} mt={4}>
              <label htmlFor="image-upload">
                <IconButton
                  as="span"
                  aria-label="Upload image"
                  icon={<FiImage />}
                  size="lg"
                  variant="ghost"
                  colorScheme="blue"
                />
              </label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleImageChange}
              />

              <label htmlFor="video-upload">
                <IconButton
                  as="span"
                  aria-label="Upload video"
                  icon={<FiVideo />}
                  size="lg"
                  variant="ghost"
                  colorScheme="green"
                />
              </label>
              <Input
                id="video-upload"
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoChange}
              />
            </HStack>

            <MediaPreview
              imageFiles={imageFiles.map((file) => URL.createObjectURL(file))}
              videoFile={videoFile ? URL.createObjectURL(videoFile) : null}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={submitPost}
              isDisabled={
                !postContent.trim() && imageFiles.length === 0 && !videoFile
              }
              isLoading={isLoading}
            >
              Post
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
