"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props extends ButtonProps {
  text: string;
  path: string;
}

const CustomButton: React.FC<Props> = ({ text, path }) => {
  const router = useRouter();
  return <Button onClick={() => router.push(`${path}`)}>{text}</Button>;
};

export default CustomButton;
