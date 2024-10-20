import { Flex } from "@chakra-ui/react";
import PostCard from "./PostCard";

export default function PostList() {
  const mockPost: any = {
    profile: {
      name: "John Carter",
      avatar: "https://bit.ly/dan-abramov",
      postedTime: "4 hours ago",
    },
    postContent: {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "https://via.placeholder.com/400x300",
    },
    reactions: {
      likes: 1200,
      comments: 200,
      shares: 17,
    },
    comments: [
      {
        user: {
          name: "Annalise Hane",
          avatar: "https://via.placeholder.com/50",
        },
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      },
      {
        user: {
          name: "Robert Bell",
          avatar: "https://via.placeholder.com/50",
        },
        content:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      },
    ],
  };

  return (
    <Flex flexDirection="column" rowGap={4}>
      <PostCard post={mockPost} />
      <PostCard post={mockPost} />
      <PostCard post={mockPost} />
      <PostCard post={mockPost} />
      <PostCard post={mockPost} />
    </Flex>
  );
}
