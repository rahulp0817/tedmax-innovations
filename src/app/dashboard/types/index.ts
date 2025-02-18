// app/dashboard/types/index.ts
export interface Course {
    title: string;
    duration: string;
    progress: number;
    image: string;
    color: string;
  }
  
  export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
  }