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
import React, { useState } from "react";
import { FiImage, FiVideo } from "react-icons/fi";
import { uploadImage, uploadVideo } from "../../apis/upload.api";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../redux/postsThunk";
import { AppDispatch } from "../../redux/store";

const IMAGE_TYPE = "image";
const VIDEO_TYPE = "video";
const VIDEO_MP4 = "video/mp4";

const handleFileChange = (
  files: FileList | null,
  type: string,
  setFiles: (files: File[]) => void
) => {
  if (!files) return;
  const filteredFiles = Array.from(files).filter((file) =>
    file.type.startsWith(type)
  );
  setFiles(filteredFiles);
};

const AvatarAndName = ({ avatarUrl, name }: { avatarUrl: string; name: string }) => (
  <Box display="flex" alignItems="center" mb={4}>
    <Avatar src={avatarUrl} mr={3} />
    <Input value={name} isReadOnly variant="unstyled" />
  </Box>
);

const MediaPreview = ({ imageFiles, videoFile }: { imageFiles: string[]; videoFile: string | null }) => (
  <React.Fragment>
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
          <source src={videoFile} type={VIDEO_MP4} />
          Your browser does not support the video tag.
        </video>
      </Box>
    )}
  </React.Fragment>
);

export default function CreatePostForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postContent, setPostContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const user = useAuth();
  const dispatch: AppDispatch = useDispatch();

  const currentUser = { name: "John Doe", avatarUrl: "/your-avatar-url" };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files, IMAGE_TYPE, setImageFiles);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoFiles = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith(VIDEO_TYPE)
    );
    if (videoFiles.length > 0) setVideoFile(videoFiles[0]);
  };

  const submitPost = async () => {
    setLoading(true);
    const imageResponse = await uploadImages(imageFiles);
    const videoResponse = await uploadVideos(videoFile);

    const newPost = createPostPayload(postContent, imageResponse, videoResponse);
    dispatch(createNewPost(newPost as any));
    handleClose();
    setLoading(false);
  };

  const uploadImages = async (files: File[]) => {
    if (!files.length) {
      console.log("No images to upload.");
      return null;
    }
    
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await uploadImage(formData);
      console.log("Image upload successful:", response);
      return response;
    } catch (error) {
      console.error("Error uploading images:", error);
      return null;
    }
  };

  const uploadVideos = async (file: File | null) => {
    if (!file) {
      console.log("No video to upload.");
      return null;
    }

    const formData = new FormData();
    formData.append("videos", file);

    try {
      const response = await uploadVideo(formData);
      console.log("Video upload successful:", response);
      return response;
    } catch (error) {
      console.error("Error uploading video:", error);
      return null;
    }
  };

  const createPostPayload = (content: string, imageResponse: any, videoResponse: any) => ({
    content,
    imgUrl: imageResponse ? imageResponse.url : "",
    imgName: imageResponse ? imageResponse.name : "",
    imgPublicId : imageResponse ? imageResponse.public_id : "",
    videoUrl: videoResponse ? videoResponse.url : "",
    videoName: videoResponse ? videoResponse.name : "",
    videoPublicId : videoResponse ? videoResponse.public_id : "",
    userId: user.user?.id,
  });

  const handleClose = () => {
    setPostContent("");
    setImageFiles([]);
    setVideoFile(null);
    onClose();
  };

  return (
    <React.Fragment>
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
              isDisabled={!postContent.trim() && imageFiles.length === 0 && !videoFile}
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
    </React.Fragment>
  );
}
