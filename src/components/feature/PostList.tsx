import { Flex } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/postsThunk";
import { RootState, AppDispatch } from "../../redux/store";

export default function PostList() {
  const dispatch: AppDispatch = useDispatch();
  const listPosts = useSelector((state: RootState) => state.posts.list);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Flex flexDirection="column" rowGap={4}>
      {listPosts.map((post : any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Flex>
  );
}
