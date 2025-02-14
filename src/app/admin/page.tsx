"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Flag,
  LucideIcon,
  ChartSpline,
  MessageCircle,
  PackagePlus,
  Users,
  Briefcase,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession();

  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18 || currentHour < 5) {
    greeting = "Good Evening";
  }

  type CardData = {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
  };

  const cardsData: CardData[] = [
    {
      href: "/admin/add-course",
      icon: PackagePlus,
      title: "Add Course",
      description: "Proceed to add new course",
    },
    {
      href: "/admin/content",
      icon: FileText,
      title: "View Content",
      description: "Browse and manage existing content",
    },
    {
      href: "/admin/analytics",
      icon: ChartSpline,
      title: "Analytics",
      description: "View and analyze user data and trends",
    },
    {
      href: "/admin/internships",
      icon: Briefcase,
      title: "Internships Management",
      description: "Add new internships",
    },
    {
      href: "/admin/user",
      icon: Users,
      title: "User Management",
      description: "Manage user accounts and permissions",
    },
    {
      href: "/admin/comment",
      icon: MessageCircle,
      title: "Comments Management",
      description: "Moderate and manage user comments",
    },
  ];

  const AdminCard: React.FC<CardData> = ({
    href,
    icon: Icon,
    title,
    description,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        <Link
          href={href}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex h-[15rem] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 p-4 transition-all duration-200 ease-linear hover:border-blue-500"
        >
          <div className="flex h-[3rem] w-[4rem] items-center justify-center rounded-md border bg-blue-400 bg-opacity-5 p-2">
            <Icon className="h-6 w-6" />
          </div>
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-1">
            <h1 className="text-xl font-semibold">{title}</h1>

            {isHovered && (
              <AnimatePresence>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-400 transition-all duration-200 ease-linear"
                >
                  {description}
                </motion.p>
              </AnimatePresence>
            )}
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <main className="mx-auto flex max-h-fit min-h-full w-full max-w-[1280px] flex-col items-center gap-6 p-4">
      <section className="flex w-full flex-col gap-2 text-center text-3xl">
        <h1>
          {greeting},{" "}
          {session?.user?.name
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
        <h4 className="text-sm text-gray-500">
          Welcome! Explore more from below
        </h4>
      </section>

      <section className="my-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <AdminCard key={index} {...card} />
        ))}
      </section>
    </main>
  );
}
