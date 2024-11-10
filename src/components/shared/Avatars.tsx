import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ChatAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

function ServerAvatar() {
  return (
    <Avatar>
      <AvatarImage src={"https://scontent.fdel8-2.fna.fbcdn.net/o1/v/t0/f1/m340/genai_m4_prn_nha_v3:upload_img_30092610_11_05_2024_13_19_52_542453_1886465126117635730.jpeg?_nc_ht=scontent.fdel8-2.fna.fbcdn.net&_nc_cat=109&ccb=9-4&oh=00_AYDn6IjKXamWbd0233TE7wAE-2HMyMhA1rICUuJAuwL2fQ&oe=672C8416&_nc_sid=5b3566"} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}



export {
  ChatAvatar,
  ServerAvatar
};
