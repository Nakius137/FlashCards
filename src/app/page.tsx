import CustomButton from "@/components/CustomButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 bg-zinc-950">
      <div>
        <h1 className="text-white text-[55px] text-center">FlashCard</h1>
        <div className="flex items-center justify-center">
          <CustomButton
            size="lg"
            className="text-[17.5px]"
            text="Sign in"
            path="/signin"
          />
          <span className="p-2"></span>
          <CustomButton
            size="lg"
            className="text-[17.5px]"
            text="Sign up"
            path="/signup"
          />
        </div>
      </div>
    </main>
  );
}
