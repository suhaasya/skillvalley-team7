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
  where,
} from "firebase/firestore";

import { db } from "../firebase.config";

async function getAllPosts() {
  const posts = [];
  try {
    const postsRef = collectionGroup(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const postsSnap = await getDocs(postsQuery);

    postsSnap.forEach(async (doc) => {
      posts.push({ _id: doc.id, ...doc.data() });
    });

    return new Promise((resolve, reject) => {
      resolve(posts);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}

export function useGetAllPosts() {
  const allPosts = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getAllPosts(),
  });

  return allPosts;
}

async function createPost(id, post) {
  const docRef = doc(db, "users", id, "posts", post.postId);
  return await setDoc(docRef, post);
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return createPost(data.userId, data.postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allPosts"]);
    },
  });
}

async function deletePost(userId, postId) {
  return await deleteDoc(doc(db, "users", userId, "posts", postId));
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return deletePost(data.userId, data.postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allPosts"]);
      queryClient.invalidateQueries(["userPosts"]);
    },
  });
}

async function bookmarkPost(userId, postId) {
  return updateDoc(doc(db, "users", userId), {
    bookmarks: arrayUnion(postId),
  });
}

export function useBookmarkPost(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => {
      return bookmarkPost(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

async function removeBookmarkPost(userId, postId) {
  return updateDoc(doc(db, "users", userId), {
    bookmarks: arrayRemove(postId),
  });
}

export function useRemoveBookmarkPost(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => {
      return removeBookmarkPost(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

async function getBoookmarkPosts(bookmarks) {
  const posts = [];

  if (bookmarks?.length) {
    try {
      const postsRef = collectionGroup(db, "posts");
      const postsQuery = query(postsRef, where("postId", "in", bookmarks));
      const postsSnap = await getDocs(postsQuery);

      postsSnap.forEach(async (doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });

      return new Promise((resolve) => {
        resolve(posts);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

  return new Promise((resolve, reject) => {
    resolve(posts);
  });
}

export function useGetBoookmarkPosts(bookmakrs) {
  const bookmarks = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBoookmarkPosts(bookmakrs),
  });

  return bookmarks;
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
      queryClient.invalidateQueries(["allPosts"]);
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
      queryClient.invalidateQueries(["allPosts"]);
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
