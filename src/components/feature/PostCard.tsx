import {
  Box,
  Avatar,
  Text,
  Image,
  IconButton,
  HStack,
  VStack,
  Input,
  useColorModeValue,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
  MenuButton,
  MenuItem,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import { FaEllipsisH, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PiShareFatBold } from "react-icons/pi";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { removePost } from "../../redux/postsThunk";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { deleteImage } from "../../apis/upload.api";

interface User {
  id: number;
  name: string;
}

interface Comment {
  user: User;
  content: string;
}

interface Post {
  id: number;
  content: string;
  imgUrl?: string;
  imgName?: string;
  imgPublicId?: string;
  videoUrl?: string;
  videoName?: string;
  videoPublicId?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
  user: User;
  comments?: Comment[];
}

interface PostCardProps {
  post: Post;
}

const ReactionButton = ({
  icon,
  count,
}: {
  icon: React.ReactElement;
  count: number | string;
}) => {
  const buttonBg = useColorModeValue("gray.200", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.300", "gray.600");

  return (
    <HStack
      spacing={1}
      bg={buttonBg}
      py={1.5}
      px={4}
      borderRadius="full"
      cursor="pointer"
      _hover={{ bg: buttonHoverBg }}
      transition="ease-in-out"
      alignItems="center"
      border="1px solid"
    >
      <Flex alignItems="center" mr={1}>
        {icon}
      </Flex>
      <Text fontWeight={500}>{count.toLocaleString()}</Text>
    </HStack>
  );
};

const CommentSection = ({
  comments,
  secondaryTextColor,
}: {
  comments?: Comment[];
  secondaryTextColor: string;
}) => (
  <>
    {comments?.map((comment, index) => (
      <HStack spacing={3} key={index} mb={3}>
        <Avatar name={comment.user.name} size="sm" />
        <VStack align="start">
          <Text fontWeight="bold">{comment.user.name}</Text>
          <Text fontSize="sm" color={secondaryTextColor}>
            {comment.content}
          </Text>
        </VStack>
      </HStack>
    ))}
  </>
);

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    id,
    user,
    content,
    imgUrl,
    imgPublicId,
    likeCount,
    commentCount,
    shareCount,
    createdAt,
    comments,
  } = post;

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [isLoading, setLoading] = useState<Boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const deleteAPost = async () => {
    setLoading(true);
    await deleteImage(imgPublicId || "")
      .then(() => dispatch(removePost(id)))
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <Box
      p={6}
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      bg={bg}
      color={textColor}
      border={`1px solid ${borderColor}`}
      position="relative"
      opacity={isLoading ? 0.5 : 1}
      transition="opacity 0.3s ease"
    >
      <LoadingOverlay isLoading={isLoading} />

      <HStack justifyContent="space-between" spacing={3} mb={3}>
        <HStack>
          <Avatar name={user.name} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{user.name}</Text>
            <Text fontSize="sm" color={secondaryTextColor}>
              {formattedDate}
            </Text>
          </VStack>
        </HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaEllipsisH />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem color="red.700" fontWeight={700} onClick={deleteAPost}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Text mb={4} fontSize="lg" lineHeight="1.5">
        {content}
      </Text>
      {imgUrl && (
        <Flex justifyContent="center" mb={4}>
          <Image borderRadius="md" src={imgUrl} alt="Post Image" />
        </Flex>
      )}

      <HStack spacing={4} mb={3}>
        <ReactionButton icon={<FaRegHeart />} count={likeCount} />
        <ReactionButton icon={<FaRegCommentAlt />} count={commentCount} />
        <ReactionButton icon={<PiShareFatBold />} count={shareCount} />
      </HStack>

      <HStack spacing={3} mt={4}>
        <Avatar name="Current User" src="https://via.placeholder.com/40" />
        <InputGroup flex="1">
          <Input
            placeholder="Write your comment"
            variant="filled"
            bg={useColorModeValue("gray.100", "gray.700")}
            border={`1px solid ${borderColor}`}
            borderRadius="full"
            size="md"
          />
          <InputRightElement width="4rem">
            <Button
              h="1.75rem"
              size="md"
              bg={useColorModeValue("gray.300", "gray.600")}
              borderRadius="full"
              _hover={{ bg: useColorModeValue("gray.400", "gray.500") }}
            >
              <IoSend />
            </Button>
          </InputRightElement>
        </InputGroup>
      </HStack>

      <CommentSection
        comments={comments}
        secondaryTextColor={secondaryTextColor}
      />
    </Box>
  );
};

export default PostCard;
