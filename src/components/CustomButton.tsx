"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";

interface Props extends ButtonProps {
  text: string;
  path: string;
}

const CustomButton: React.FC<Props> = ({ text, path, variant }) => {
  return (
    <Button asChild variant={variant}>
      <Link href={path}>{text}</Link>
    </Button>
  );
};

export default CustomButton;
