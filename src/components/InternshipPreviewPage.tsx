"use client";
import React, { useState } from "react";
import { ArrowLeft, Play, ChevronDown, CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

interface InternshipPreviewPageProps {
  course: Course;
}
const InternshipPreviewPage: React.FC<InternshipPreviewPageProps> = ({
  course,
}) => {
  const router = useRouter();
  const [moduleProgress, setModuleProgress] = useState<Record<string, boolean>>(
    {}
  );
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  const totalModules = 8; // Increased number of modules
  const totalQuizzes = 3;

  const handleModuleComplete = (moduleId: string) => {
    setModuleProgress((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleQuizClick = (quizId: number) => {
    // Navigate to quiz page
    router.push(`quiz/${quizId}`);
  };

  // Calculate if course is completed based on module completion and quiz scores
  const isModulesCompleted =
    Object.values(moduleProgress).filter(Boolean).length === totalModules;
  const isQuizzesCompleted =
    Object.values(quizScores).filter((score) => score >= 80).length ===
    totalQuizzes;
  const isCourseCompleted = isModulesCompleted && isQuizzesCompleted;

  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="max-w-7xl mx-auto p-6 mb-32">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>Back to dashboard</span>
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
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Claim your Certificate
          </h1>
          <div className="bg-white rounded-xl p-6 shadow-sm size-[500px]">
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
                  {isCourseCompleted
                    ? "View Certificate"
                    : "Complete Course to View Certificate"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="max-h-[420px] overflow-y-auto pr-6">
              <Accordion type="single" collapsible>
                {Array.from({ length: totalModules }, (_, i) => (
                  <AccordionItem key={i} value={`module-${i + 1}`}>
                    <AccordionTrigger>
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-6">
                          <input
                            type="checkbox"
                            checked={moduleProgress[`module-${i + 1}`] || false}
                            onChange={() =>
                              handleModuleComplete(`module-${i + 1}`)
                            }
                            className="ml-0 w-4 h-4"
                          />
                          <span>Chapter {i + 1}</span>
                        </div>
                        <div className="mr-4">
                          {moduleProgress[`module-${i + 1}`] ? (
                            <span className="text-white text-sm border px-2 py-1 items-center rounded-xl bg-[#00DDC0]">
                              Completed
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm"></span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="flex items-center gap-2 mb-1">
                        <CirclePlay className="w-4 h-4" />
                        Content for Module {i + 1}
                      </p>
                      <p className="flex items-center gap-2 mb-1">
                        <CirclePlay className="w-4 h-4" />
                        Content for Module {i + 2}
                      </p>
                      <p className="flex items-center gap-2">
                        <CirclePlay className="w-4 h-4" />
                        Content for Module {i + 3}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {/* Quizzes section */}
                {Array.from({ length: totalQuizzes }, (_, i) => (
                  <AccordionItem key={`quiz-${i + 1}`} value={`quiz-${i + 1}`}>
                    <AccordionTrigger>
                      <div className="flex items-center w-full justify-between">
                        <span>Quiz {i + 1}</span>
                        <div className="mr-4">
                          {quizScores[`quiz-${i + 1}`] >= 80 ? (
                            <span className="text-white text-sm border px-2 py-1 items-center rounded-xl bg-[#00DDC0]">
                              Completed
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm"></span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <span>Score 75% to pass the quiz</span>
                      <div className="p-4">
                        <Button
                          onClick={() => handleQuizClick(i + 1)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Start Quiz
                        </Button>
                        {quizScores[`quiz-${i + 1}`] && (
                          <p className="mt-2 text-sm text-gray-600">
                            Your score: {quizScores[`quiz-${i + 1}`]}%
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow relative overflow-hidden">
            {/* Image Container with Gradient Overlay */}
            <div className="relative">
              <img
                src="/Mentor-image.jpg"
                alt="Mentor Preview"
                className="w-full rounded-xl "
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 rounded-xl"></div>
            </div>

            <div className="absolute inset-x-0 bottom-40 ml-6 px-4">
              <span className="text-white text-2xl font-bold ">
                Connect out Experts
              </span>
            </div>

            {/* Content Positioned Over the Gradient */}
            <div className="mt-2">
              <span className="text-black font-normal">
                If you have any doubts, contact our Experts!
              </span>
              <Button
                onClick={() =>
                  (window.location.href = "mailto:contact@tedmex.in")
                }
                className="bg-[var(--primary-color)] mt-4 w-full rounded-lg shadow-lg transition-colors font-normal hover:bg-red-800 text-white"
              >
                Connect Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPreviewPage;
