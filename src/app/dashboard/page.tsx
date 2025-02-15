// app/dashboard/page.tsx
'use client';
import DashboardContent from './components/DashboardContent';

export default function DashboardPage() {
    return <DashboardContent isSidebarOpen={true} />;
}