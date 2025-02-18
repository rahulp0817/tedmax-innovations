"use client";
import React, { useState } from "react";
import { Cuboid, PackagePlus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Zod schema for Course
const CourseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  imageUrl: z.string().min(1, "Course image URL is required"),
  description: z.string().min(1, "Course description is required"),
  id: z.string(),
  price: z.number().min(0, "Price must be a positive number"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  instructor: z.string().min(1, "Instructor name is required"),
  prerequisites: z.string().min(1, "Prerequisites are required"),
  learningOutcomes: z.string().min(1, "Learning outcomes are required"),
  certification: z.string().min(1, "Certification details are required"),
  level: z.string().min(1, "Course level is required"),
  startDate: z.string().min(1, "Start date is required"),
});

const CourseFormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      id: "",
      price: 0,
      duration: 1,
      instructor: "",
      prerequisites: "",
      learningOutcomes: "",
      certification: "",
      level: "",
      startDate: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CourseSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      toast.success("Course successfully created");
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderBasicInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructor Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter instructor name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Level</FormLabel>
              <FormControl>
                <Input placeholder="Enter course level" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type="date" 
                    {...field} 
                    className="appearance-none relative" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );

  const renderCourseDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Description</FormLabel>
            <FormControl>
              <Textarea 
                className="h-32"
                placeholder="Enter course description"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Price</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (hours)</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="Enter duration"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="certification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification</FormLabel>
              <FormControl>
                <Input placeholder="Enter certification type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );

  const renderLearningContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="prerequisites"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prerequisites</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-24 resize-none"
                    placeholder="Enter prerequisites"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="learningOutcomes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Outcomes</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-24 resize-none"
                    placeholder="Enter learning outcomes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="flex-1 mb-20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Add Course</span>
        </nav>

        {/* Header */}
        <section className="mb-6 flex items-center gap-2 rounded-lg border-2 bg-gray-100 p-4">
          <Cuboid size={18} />
          <h2 className="text-md font-bold">Add Course</h2>
        </section>

        <Card className="mb-24">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
          </CardHeader>

          {/* Navigation Tabs */}
          <div className="flex space-x-6 px-6 border-b">
            {[
              { id: "basic", label: "Basic Information" },
              { id: "details", label: "Course Details" },
              { id: "learning", label: "Learning Content" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`pb-4 px-2 font-medium ${
                  activeSection === section.id
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <CardContent className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {activeSection === "basic" && renderBasicInfo()}
                  {activeSection === "details" && renderCourseDetails()}
                  {activeSection === "learning" && renderLearningContent()}
                </AnimatePresence>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const sections = ["basic", "details", "learning"];
                const currentIndex = sections.indexOf(activeSection);
                if (currentIndex > 0) {
                  setActiveSection(sections[currentIndex - 1]);
                }
              }}
              disabled={activeSection === "basic"}
            >
              Previous
            </Button>
            {activeSection === "learning" ? (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : (
                  <>
                    <PackagePlus className="mr-2 h-4 w-4" />
                    Create Course
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const sections = ["basic", "details", "learning"];
                  const currentIndex = sections.indexOf(activeSection);
                  if (currentIndex < sections.length - 1) {
                    setActiveSection(sections[currentIndex + 1]);
                  }
                }}
              >
                Next
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default CourseFormPage;