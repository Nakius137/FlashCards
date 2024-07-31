"use client";

import CustomButton from "@/components/CustomButton";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const isActive = (path: string) => pathName === path;

  return (
    <main className="flex min-h-screen flex-col items-center p-2 bg-zinc-950">
      <nav className="space-x-5">
        <CustomButton
          text={"My sets"}
          path={"/dashboard"}
          variant={isActive("/dashboard") ? "outline" : "default"}
        />
        <CustomButton
          text={"Search"}
          path={"/dashboard/search"}
          variant={isActive("/dashboard/search") ? "outline" : "default"}
        />
        <CustomButton
          text={"Create"}
          path={"/dashboard/create"}
          variant={isActive("/dashboard/create") ? "outline" : "default"}
        />
      </nav>
      {children}
    </main>
  );
}
