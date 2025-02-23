'use client'
import React, { useState } from "react";
import {
  ArrowLeft,
  Play,
  ChevronDown,
  CheckCircle,
  Circle
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Course {
  image: string;
  title: string;
  description: string;
  price: number;
  totalSections: number;
  totalLectures: number;
  duration: string;
  learnerCount: number;
}

interface CoursePreviewPageProps {
  course: Course;
}

const CoursePreviewPage: React.FC<CoursePreviewPageProps> = ({ course }) => {
  const router = useRouter();
  const [moduleProgress, setModuleProgress] = useState<Record<string, boolean>>({});
  const [quizProgress, setQuizProgress] = useState<Record<string, boolean>>({});

  const totalModules = 10;
  const totalQuizzes = 5;
  const totalItems = totalModules + totalQuizzes;

  const completedItems = Object.values(moduleProgress).filter(Boolean).length +
    Object.values(quizProgress).filter(Boolean).length;
  
  const isCourseCompleted = completedItems === totalItems;

  const handleModuleComplete = (moduleId: string) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleQuizComplete = (quizId: string) => {
    setQuizProgress(prev => ({
      ...prev,
      [quizId]: !prev[quizId]
    }));
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>Back to Courses</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content Column */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video mb-8 rounded-3xl overflow-hidden">
            <img
              src={course.image || "/videoImage.png"}
              alt="Course Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Play size={32} className="text-gray-900 ml-1" />
              </button>
            </div>
            {/* Course Status Dropdown */}
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    Course Status <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {Array.from({ length: totalModules }).map((_, i) => (
                    <DropdownMenuItem key={i} className="flex items-center justify-between">
                      <span>Module {i + 1}</span>
                      {moduleProgress[`module-${i + 1}`] ? 
                        <span className="text-green-600 text-sm">Completed</span> : 
                        <span className="text-gray-400 text-sm">Not Completed</span>
                      }
                    </DropdownMenuItem>
                  ))}
                  {Array.from({ length: totalQuizzes }).map((_, i) => (
                    <DropdownMenuItem key={`quiz-${i}`} className="flex items-center justify-between">
                      <span>Quiz {i + 1}</span>
                      {quizProgress[`quiz-${i + 1}`] ? 
                        <span className="text-green-600 text-sm">Completed</span> : 
                        <span className="text-gray-400 text-sm">Not Completed</span>
                      }
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              Overview of course
            </h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Accordion type="single" collapsible>
              {Array.from({ length: totalModules }, (_, i) => (
                <AccordionItem key={i} value={`module-${i + 1}`}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>Module {i + 1}</span>
                      <input 
                        type="checkbox" 
                        checked={moduleProgress[`module-${i + 1}`] || false}
                        onChange={() => handleModuleComplete(`module-${i + 1}`)}
                        className="ml-2"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Content for Module {i + 1}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
              {Array.from({ length: totalQuizzes }, (_, i) => (
                <AccordionItem key={`quiz-${i + 1}`} value={`quiz-${i + 1}`}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>Quiz {i + 1}</span>
                      <input 
                        type="checkbox" 
                        checked={quizProgress[`quiz-${i + 1}`] || false}
                        onChange={() => handleQuizComplete(`quiz-${i + 1}`)}
                        className="ml-2"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Content for Quiz {i + 1}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="relative">
              <img
                src="/Webdev-Course-Certificate.png"
                alt="Certificate Preview"
                className="w-full rounded-lg blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  disabled={!isCourseCompleted}
                  className="bg-white text-gray-900 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                >
                  {isCourseCompleted ? "View Certificate" : "Complete Course to View Certificate"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPage;