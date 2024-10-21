import { useAuth } from "../../context/AuthContext";
import CreatePostForm from "../feature/CreatePostForm";
import PostList from "../feature/PostList";
import Navbar from "./header";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const user = useAuth();

  return (
    <Box>
      <Navbar />
      <Box maxW="xl" mx="auto" px={2}>
        {user.user && <CreatePostForm />}
        <PostList />
      </Box>
    </Box>
  );
}
