"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

// Define the validation schema
const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

function AccountDetails() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const fullName = session?.user?.name || "";
  const [firstName, lastName] = fullName.split(" ");

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      email: session?.user?.email || "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    try {
      // Here you would typically make an API call to update the password
      toast("Profile updated successfully!", { icon: "🎉" });
      setIsEditing(false);
      form.reset({
        ...values,
        password: "", // Clear password after successful submission
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Personal details of the user!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      placeholder={firstName || "...."}
                      type="text"
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      placeholder={lastName || "...."}
                      type="text"
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      placeholder={session?.user?.email || "johndoe@gmail.com"}
                      type="email"
                      className="h-10"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      placeholder="••••••••"
                      type="password"
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-16">
              <Button
                size="lg"
                type={isEditing ? "submit" : "button"}
                variant="default"
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AccountDetails;
