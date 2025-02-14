import Signup from "@/components/Signup";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const SignupPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return <Signup />;
};

export default SignupPage;
