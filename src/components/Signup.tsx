"use client";
import React, { useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { GithubSignIn } from "./github-sign-in";
import { GoogleSignIn } from "./google-sign-in";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/lib/schema";
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
import { register } from "@/app/actions/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const emailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "hotmail.com",
  "rediffmail.com",
];

const Signup = () => {
  const [suggestedDomains, setSuggestedDomains] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<Array<HTMLLIElement | null>>([]);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSuggestedDomains([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("email", value, { shouldValidate: true });

    setFocusedIndex(0);

    // Show suggestions only when @ is typed
    if (!value.includes("@")) {
      const [, domain] = value.split("@");

      if (!domain) {
        // If there's nothing after @, show all domains
        setSuggestedDomains(emailDomains);
      } else {
        // Filter domains based on what's typed after @
        const filteredDomains = emailDomains.filter((emailDomain) =>
          emailDomain.toLowerCase().startsWith(domain.toLowerCase())
        );
        setSuggestedDomains(filteredDomains);
      }
    } else {
      setSuggestedDomains([]);
    }
  };

  const handleSuggestionClick = (domain: string) => {
    const currentValue = form.getValues("email");
    const [username] = currentValue.split("@");
    const newEmail = `${username}@${domain}`;
    form.setValue("email", newEmail, { shouldValidate: true });
    setSuggestedDomains([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestedDomains.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < suggestedDomains.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestedDomains[focusedIndex]);
    } else if (e.key === "Escape") {
      setSuggestedDomains([]);
    }
  };

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    try {
      setIsSubmitting(true);
      await register(values);

      await toast.promise(
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        }),
        {
          loading: "Creating your account...",
          success: "Account created successfully!",
          error: "Failed to create account",
        }
      );

      await router.refresh();
      router.push("/");
    } catch (error: any) {
      if (error.message.includes("User already exists")) {
        toast.error("User already exists. Try logging in.");
      } else {
        toast.error(error.message || "Signup failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
        {/* Header section remains the same */}
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter xl:text-4xl">
            Welcome to{" "}
            <span className="bg-gradient-to-b from-red-400 to-red-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              Tedmax
            </span>
          </h2>
          <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
            Create an account to access content!
          </p>
        </div>

        {/* OAuth buttons */}
        <div className="space-y-4">
          <GithubSignIn />
          <GoogleSignIn />
        </div>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 bg-white text-gray-500 text-sm font-medium">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Form section */}
        <div className="flex flex-col gap-8">
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-2 mb-4">
                  {/* Name field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            type="text"
                            className="h-10 focus:ring-none border-none bg-primary/5 focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email field with suggestions */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            ref={emailInputRef}
                            placeholder="johndoe@gmail.com"
                            type="email"
                            className="h-10 focus:ring-none border-none bg-primary/5 focus:outline-none"
                            onChange={(e) => {
                              field.onChange(e);
                              handleEmailChange(e);
                            }}
                            onKeyDown={handleKeyDown}
                          />
                        </FormControl>
                        {suggestedDomains.length > 0 && (
                          <ul
                            ref={dropdownRef}
                            className="absolute z-50 w-full mt-1 cursor-default select-none items-center p-2 text-sm outline-none rounded-md border bg-white shadow-lg"
                          >
                            {suggestedDomains.map((domain, index) => (
                              <>
                                <li
                                  key={domain}
                                  ref={(el) => {
                                    suggestionRefs.current[index] = el;
                                  }}
                                  onClick={() => handleSuggestionClick(domain)}
                                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                                    focusedIndex === index ? "bg-gray-100" : ""
                                  }${
                                    index < suggestedDomains.length
                                      ? "border-t border-gray-300"
                                      : ""
                                  }`}
                                >
                                  {form.getValues("email").split("@")[0]}@
                                  {domain}
                                </li>
                              </>
                            ))}
                          </ul>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="••••••••"
                            type="password"
                            className="h-10 focus:ring-none border-none bg-primary/5 focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit button */}
                <Button
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid || isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>

            {/* Sign in link */}
            <div>
              <p className="text-center text-sm font-medium text-neutral-500 mt-4">
                <Link href="/signin" className="hover:text-red-500">
                  Already have an account?
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

export default Signup;
