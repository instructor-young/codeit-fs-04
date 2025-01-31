"use client";

import api from "@/api";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LogInModal from "../../../_components/LogInModal";

function LikeButton({ movieId }) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();
  const { data: isLiked } = useQuery({
    queryKey: ["movieLike", { movieId }],
    queryFn: () => api.movies.getLikeOnMovie(movieId),
    enabled: isLoggedIn,
    initialData: false,
  });
  const { mutate: likeMovie } = useMutation({
    mutationFn: () => api.movies.likeMovie(movieId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["movieLike", { movieId }] }),
  });
  const { mutate: unlikeMovie } = useMutation({
    mutationFn: () => api.movies.unlikeMovie(movieId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["movieLike", { movieId }] }),
  });

  const label = isLoggedIn && isLiked ? "찜 풀기" : "찜 하기";
  const modal = useModal();

  const handleClick = () => {
    if (!isLoggedIn) return modal.open(<LogInModal />);

    if (isLiked) unlikeMovie();
    else likeMovie();
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      intent={isLoggedIn && isLiked ? "white" : "primary"}
      className={"w-full mt-4"}
    >
      {label}
    </Button>
  );
}

export default LikeButton;
