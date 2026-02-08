import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Post {
  id: number;
  content: string;
  lifespanCategory: string;
  createdAt: string;
  expiresAt: string;
  remainingMinutes: number;
}

const API_URL = 'http://localhost:5000/api/posts';

export const usePosts = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    refetchInterval: 60000, // 1分ごとに更新
  });

  const createPostMutation = useMutation({
    mutationFn: async (newPost: { content: string; lifespanCategory: string; lifespanMinutes: number }) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    createPost: createPostMutation.mutate,
    isCreating: createPostMutation.isPending,
  };
};
