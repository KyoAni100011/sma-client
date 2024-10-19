import {
  Box,
  Avatar,
  Text,
  Image,
  IconButton,
  HStack,
  VStack,
  Input,
} from "@chakra-ui/react";
import { FaHeart, FaComment, FaShare, FaEllipsisH } from "react-icons/fa";

interface User {
  name: string;
  avatar: string;
}

interface Comment {
  user: User;
  content: string;
}

interface Post {
  profile: User & { postedTime: string };
  postContent: {
    text: string;
    imageUrl: string;
  };
  reactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments: Comment[];
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
    >
      {/* Profile Info */}
      <HStack spacing={3} mb={3}>
        <Avatar name={post.profile.name} src={post.profile.avatar} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{post.profile.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {post.profile.postedTime}
          </Text>
        </VStack>
        <IconButton
          aria-label="Options"
          icon={<FaEllipsisH />}
          variant="ghost"
        />
      </HStack>

      {/* Post Text */}
      <Text mb={4}>{post.postContent.text}</Text>

      {/* Image */}
      <Image
        borderRadius="md"
        src={post.postContent.imageUrl}
        alt="Post Image"
        mb={4}
      />

      {/* Reactions */}
      <HStack spacing={4} mb={3}>
        <HStack spacing={1}>
          <FaHeart color="red" />
          <Text>{post.reactions.likes.toLocaleString()}</Text>
        </HStack>
        <HStack spacing={1}>
          <FaComment />
          <Text>{post.reactions.comments}</Text>
        </HStack>
        <HStack spacing={1}>
          <FaShare />
          <Text>{post.reactions.shares}</Text>
        </HStack>
      </HStack>

      {/* Comment Input */}
      <Input placeholder="Write your comment" variant="filled" mb={3} />

      {/* Comments */}
      {post.comments.map((comment, index) => (
        <HStack spacing={3} key={index} mb={2}>
          <Avatar
            name={comment.user.name}
            size="sm"
            src={comment.user.avatar}
          />
          <VStack align="start">
            <Text fontWeight="bold">{comment.user.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {comment.content}
            </Text>
          </VStack>
        </HStack>
      ))}
    </Box>
  );
};

export default PostCard;
