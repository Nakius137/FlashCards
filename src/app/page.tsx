import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 bg-zinc-950">
      <div>
        <h1 className="text-white text-[55px] text-center">FlashCard</h1>
        <div className="flex items-center justify-center">
          <Button size="lg" className="text-[17.5px]">
            Sign in
          </Button>
          <span className="p-2"></span>
          <Button size="lg" className="text-[17.5px]">
            Sign up
          </Button>
        </div>
      </div>
    </main>
  );
}
