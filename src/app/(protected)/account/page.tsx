"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link2, Trash } from "lucide-react";
import Accountdetails from "@/components/profile-menu/account-details";

function page() {
  const { data: session } = useSession();
  const [imageError, setImageError] = useState(false);

  const handlelinkcopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile Link Copied!", {
      className: "text-success",
    });
  };

  const handledelete = async () => {
    try {
      // await fetch(`/api/delete-account`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ userId: session?.user?.id }),
      // });
      toast.error("Account deleted successfully!", {
        className: "text-red-500",
      });
      // window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account!");
    }
  };
  return (
    <section className="mx-24 w-full overflow-hidden ">
      <div className="flex gap-12 w-full">
        <div className="text-center">
          <Card className="p-6">
            <CardContent>
              <div className="text-center px-[10%]">
                {session?.user?.image && !imageError ? (
                  <img
                    src={session?.user?.image || "/default-avatar.jpg"}
                    alt="User Profile"
                    className="size-40 rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="flex size-40 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white text-7xl">
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="mt-4 font-semibold">
                <p>{session?.user?.name}</p>
              </div>
            </CardContent>
            <CardFooter className="grid grid-row gap-4 ">
              <Button
                size={"lg"}
                variant="outline"
                className="w-full gap-3 text-blue-500 border border-blue-600 hover:bg-blue-100"
                onClick={handlelinkcopy}
              >
                <Link2 />
                Share Profile Link
              </Button>
              <Button
                size={"lg"}
                variant="outline"
                className="w-full gap-3 text-red-500 border border-red-600 hover:bg-red-100"
                onClick={handledelete}
              >
                <Trash />
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full">
          <Accountdetails />
        </div>
      </div>
    </section>
  );
}

export default page;
