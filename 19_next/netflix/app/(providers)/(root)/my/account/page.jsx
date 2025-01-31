"use client";

import api from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function MyAccountPage() {
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { data: myProfile } = useQuery({
    queryKey: ["myProfile"],
    queryFn: api.users.getMyProfile,
  });
  const { mutate: updateMyProfile } = useMutation({
    mutationFn: api.users.updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"], exact: true });
    },
  });

  useEffect(() => {
    if (myProfile) setNickname(myProfile.nickname);
  }, [myProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMyProfile({ avatar, nickname });
  };

  const handleChangeAvatar = (e) => {
    const fileList = e.target.files;
    const avatar = fileList[0] || null;

    setAvatar(avatar);
  };

  const avatarUrl = avatar ? URL.createObjectURL(avatar) : myProfile?.avatarUrl;

  if (!myProfile) return null;

  return (
    <div className="py-20 container mx-auto max-w-sm">
      <section className="bg-white text-black p-8 rounded-lg">
        <h2 className="text-2xl font-bold">내 프로필</h2>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {!!avatarUrl ? (
            <img
              src={avatarUrl}
              className="size-40 rounded-full mx-auto aspect-square object-cover"
            />
          ) : (
            <div className="size-40 bg-gray-200 rounded-full mx-auto" />
          )}
          <input onChange={handleChangeAvatar} type="file" />

          <Input
            label="이메일"
            value={myProfile.email}
            onChange={() => {}}
            disabled
          />
          <Input
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <Button intent="primary">수정하기</Button>
        </form>
      </section>
    </div>
  );
}

export default MyAccountPage;
