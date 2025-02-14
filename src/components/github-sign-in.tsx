"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "./ui/github";
import LoadingDots from "./loading-dots";
import { toast } from "sonner";

const GithubSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/" });
      toast.success("Signed In with Github");
    } catch (error) {
      console.error("github sign-in failed:", error);
      toast.error("Failed to sign in with Github");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-full h-10 gap-3 text-center"
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading ? <LoadingDots /> : <Github />}
      {isLoading ? " " : "Continue with Github"}
    </Button>
  );
};

export { GithubSignIn };
