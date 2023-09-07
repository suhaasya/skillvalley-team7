import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../firebase.config";

async function fetchPosts() {
  const posts = [];

  const postsRef = collectionGroup(db, "posts");
  const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
  const postsSnap = await getDocs(postsQuery);

  postsSnap.forEach(async (doc) => {
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

async function likePost(userId, postId) {
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.set(
        doc(db, "users", userId, "posts", postId, "likes", userId),
        {
          _id: userId,
        }
      );

      await transaction.update(doc(db, "users", userId, "posts", postId), {
        likes: increment(1),
      });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve) => {
    resolve();
  });
}

export function useLikePost(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => {
      return likePost(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postsData"]);
      queryClient.invalidateQueries([`like-${postId}`]);
    },
  });
}

async function removeLike(userId, postId) {
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.delete(
        doc(db, "users", userId, "posts", postId, "likes", userId)
      );

      await transaction.update(doc(db, "users", userId, "posts", postId), {
        likes: increment(-1),
      });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve) => {
    resolve();
  });
}

export function useRemoveLike(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => {
      return removeLike(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postsData"]);
      queryClient.invalidateQueries([`like-${postId}`]);
    },
  });
}

async function getLikeStatus(userId, postId) {
  return getDoc(doc(db, "users", userId, "posts", postId, "likes", userId));
}

export function useGetLikeStatus(userId, postId) {
  const { data: like } = useQuery({
    queryKey: [`like-${postId}`],
    queryFn: () => getLikeStatus(userId, postId),
  });

  return { data: like };
}

async function bookmarkPost(userId, postId) {
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.update(doc(db, "users", userId), {
        bookmarks: arrayUnion(postId),
      });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve) => {
    resolve();
  });
}

export function useBookmarkPost(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => {
      return bookmarkPost(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postsData"]);
      queryClient.invalidateQueries([`bookmark-${postId}`]);
      queryClient.invalidateQueries([`userData`]);
    },
  });
}

async function removeBookmarkPost(userId, postId) {
  try {
    await runTransaction(db, async (transaction) => {
      await transaction.update(doc(db, "users", userId), {
        bookmarks: arrayRemove(postId),
      });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return new Promise((resolve) => {
    resolve();
  });
}

export function useRemoveBookmarkPost(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => {
      return removeBookmarkPost(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postsData"]);
      queryClient.invalidateQueries([`bookmark-${postId}`]);
      queryClient.invalidateQueries([`userData`]);
    },
  });
}

export default usePostsData;
