"use client";
import React, { useRef } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/lib/schema";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { register } from "@/actions/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Resetpassword = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    try {
      toast.success("Account created successfully!");

      toast.success("Signed in successfully!");

      await router.refresh();

      router.push("/");
    } catch (error: any) {
      if (error.message.includes("User already exists")) {
        toast.error("User already exists. Try logging in.");
      } else {
        toast.error(error.message || "Signup failed. Please try again.");
      }
    }
  };

  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
        }}
        className="flex w-full flex-col justify-between gap-8 rounded-2xl bg-white p-8 sm:max-w-[26rem]"
      >
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter xl:text-4xl">
            Welcome to{" "}
            <span className="bg-gradient-to-b from-red-400 to-red-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              Tedmex
            </span>
          </h2>
          <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
            Reset Your Password
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 "
              >
                <div className="space-y-2 mb-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Johndoe@gmail.com"
                            type="email"
                            className="h-10 focus:ring-none border-none bg-primary/5 focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button size={"lg"} type="submit" className="w-full">
                  Send otp
                </Button>
              </form>
            </Form>
            <div>
              <p className="text-center text-sm font-medium text-neutral-500 mt-4">
                <Link href="/signin" className=" hover:text-red-500 ">
                  Back to Signin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]" />
    </section>
  );
};

export default Resetpassword;
