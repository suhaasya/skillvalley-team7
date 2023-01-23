import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../firebase.config";

async function fetchPosts() {
  const posts = [];

  const postsRef = collectionGroup(db, "posts");
  const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
  const postsSnap = await getDocs(postsQuery);

  postsSnap.forEach((doc) => {
    posts.push({ _id: doc.id, ...doc.data() });
  });

  return posts;
}

function usePostsData() {
  const {
    isLoading: postsLoader,
    error: postsError,
    data: postsData,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchPosts(),
  });

  return { postsLoader, postsError, postsData };
}

async function postPostData(id, postData) {
  const docRef = doc(db, "users", id, "posts", uuid());
  await setDoc(docRef, postData);
}

export function useAddPostData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return postPostData(data.userId, data.postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postsData"]);
    },
  });
}

async function deletePostData(userId, postId) {
  await deleteDoc(doc(db, "users", userId, "posts", postId));
}

export function useDeletePostData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return deletePostData(data.userId, data.postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postsData"]);
    },
  });
}

export default usePostsData;
