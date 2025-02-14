"use client";
import React, { useState } from "react";
import { Cuboid, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CourseSchema } from "@/lib/schema";
import axios from "axios";

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      id: "",
      price: 0,
      duration: 0,
      instructor: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CourseSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/admin/course", data);
      toast("course succesfully created");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="wrapper my-16 flex flex-col gap-4 mx-24 w-full">
      <section className="my-4 flex items-center gap-2 rounded-lg border-2 bg-gray-100 p-4">
        <Cuboid size={18} />
        <h2 className="text-md font-bold">View Content</h2>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Add New Course</CardTitle>
          <CardDescription>Create a new course</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Title</label>
                <input
                  type="text"
                  className="border-2 rounded-lg p-2 w-full"
                  {...form.register("title")}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
