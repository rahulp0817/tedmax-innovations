"use client"
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

const InternshipSchema = z.object({
  title: z.string().min(1, "Program title is required"),
  imageUrl: z.string().min(1, "Company logo URL is required"),
  description: z.string().min(1, "Program description is required"),
  id: z.string(),
  fee: z.number().min(0, "Program fee must be a positive number"),
  duration: z.number().min(2, "Duration must be between 2-6 months").max(6, "Maximum duration is 6 months"),
  company: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry type is required"),
  skills: z.string().min(1, "Skills covered are required"),
  eligibility: z.string().min(1, "Eligibility criteria is required"),
  learningOutcomes: z.string().min(1, "Learning outcomes are required"),
  projectWork: z.string().min(1, "Project work details are required"),
  certificationType: z.string().min(1, "Certification details are required"),
  batchSize: z.number().min(1, "Batch size must be specified"),
  startDate: z.string().min(1, "Start date is required"),
});

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(InternshipSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      id: "",
      fee: 0,
      duration: 2,
      company: "",
      industry: "",
      skills: "",
      eligibility: "",
      learningOutcomes: "",
      projectWork: "",
      certificationType: "",
      batchSize: 30,
      startDate: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      toast.success("Training program successfully created");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
              <FormLabel>Program Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter program title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter industry type" {...field} />
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
                    style={{
                      // '::-webkit-calendar-picker-indicator': {
                      //   position: 'absolute',
                      //   right: '8px',
                      //   top: '50%',
                      //   transform: 'translateY(-50%)'
                      // }
                    }}
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

  const renderProgramDetails = () => (
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
            <FormLabel>Program Description</FormLabel>
            <FormControl>
              <Textarea 
                className="h-32"
                placeholder="Enter program description"
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
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Fee</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="Enter fee"
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
              <FormLabel>Duration (months)</FormLabel>
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
          name="batchSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Size</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="Enter batch size"
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
          name="certificationType"
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
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills Covered</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-24 resize-none"
                    placeholder="Enter skills covered"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectWork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Work</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-24 resize-none"
                    placeholder="Enter project work details"
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
          <FormField
            control={form.control}
            name="eligibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eligibility Criteria</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-24 resize-none"
                    placeholder="Enter eligibility criteria"
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
          {/* <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/programs" className="text-gray-600 hover:text-red-600 transition-colors">
            Programs
          </Link> */}
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            Add Program
          </span>
        </nav>

        {/* Header */}
        <section className="mb-6 flex items-center gap-2 rounded-lg border-2 bg-gray-100 p-4">
          <Cuboid size={18} />
          <h2 className="text-md font-bold">Add Internship Program</h2>
        </section>

        <Card className="mb-24">
          <CardHeader>
            <CardTitle>Add New Industry Training Program</CardTitle>
          </CardHeader>

          {/* Navigation Tabs */}
          <div className="flex space-x-6 px-6 border-b">
            {[
              { id: "basic", label: "Basic Information" },
              { id: "details", label: "Program Details" },
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
                  {activeSection === "details" && renderProgramDetails()}
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
                    Create Program
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

export default FormPage;