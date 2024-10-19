import PostList from "../feature/PostList";
import Navbar from "./header";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Home() {
  const bgColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Navbar />
      <PostList />
    </Box>
  );
}
