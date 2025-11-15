'use client';
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/sidebar"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/firebase/auth/use-user";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user && pathname !== '/login' && pathname !== '/signup') {
      redirect('/login');
    }
  }, [loading, user, pathname]);

  if (loading) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
       </div>
    );
  }
  
  if (!user) {
    // This will be shown briefly before the redirect fires.
    // Or if the redirect fails for some reason.
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <p>Redirecting to login...</p>
       </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
