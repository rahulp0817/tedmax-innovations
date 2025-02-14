"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Google } from "./ui/google";
import LoadingDots from "./loading-dots";
import { toast } from "sonner";

const GoogleSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
      toast.success("Signed In");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error("Failed to sign in with Google");
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
      {isLoading ? <LoadingDots /> : <Google />}
      {isLoading ? " " : "Continue with Google"}
    </Button>
  );
};

export { GoogleSignIn };
