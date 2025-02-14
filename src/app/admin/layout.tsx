import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/signin");
  }

  // if (process.env.LOCAL_CMS_PROVIDER) {
  //   return (
  //     <div className="my-[6rem] h-[calc(100vh-36px-4rem)] max-h-full">
  //       {children}
  //     </div>
  //   );
  // }

  console.log("ADMINS ENV:", process.env.ADMINS);
  console.log("Session Email:", session.user.email);

  const adminEmails =
    process.env.ADMINS?.split(",").map((email) => email.trim().toLowerCase()) ||
    [];

  if (!adminEmails.includes(session.user.email!.toLowerCase())) {
    return redirect("/");
  }

  return (
    <div className="mt-[6rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
      {children}
    </div>
  );
}
