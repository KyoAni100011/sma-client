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
} from "@chakra-ui/react";
import { FaEllipsisH, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PiShareFatBold } from "react-icons/pi";

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
    imageUrl?: string;
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
  comments: Comment[];
  secondaryTextColor: string;
}) => (
  <>
    {comments.map((comment, index) => (
      <HStack spacing={3} key={index} mb={3}>
        <Avatar name={comment.user.name} size="sm" src={comment.user.avatar} />
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
  const { profile, postContent, reactions, comments } = post;
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      p={6}
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      bg={bg}
      color={textColor}
      border={`1px solid ${borderColor}`}
    >
      <HStack justifyContent="space-between" spacing={3} mb={3}>
        <HStack>
          <Avatar name={profile.name} src={profile.avatar} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{profile.name}</Text>
            <Text fontSize="sm" color={secondaryTextColor}>
              {profile.postedTime}
            </Text>
          </VStack>
        </HStack>
        <IconButton aria-label="Options" icon={<FaEllipsisH />} variant="ghost" />
      </HStack>

      <Text mb={4} fontSize="lg" lineHeight="1.5">
        {postContent.text}
      </Text>
      {postContent.imageUrl && (
        <Flex justifyContent="center" mb={4}>
          <Image borderRadius="md" src={postContent.imageUrl} alt="Post Image" />
        </Flex>
      )}

      <HStack spacing={4} mb={3}>
        <ReactionButton icon={<FaRegHeart />} count={reactions.likes} />
        <ReactionButton icon={<FaRegCommentAlt />} count={reactions.comments} />
        <ReactionButton icon={<PiShareFatBold />} count={reactions.shares} />
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

      <CommentSection comments={comments} secondaryTextColor={secondaryTextColor} />
    </Box>
  );
};

export default PostCard;
