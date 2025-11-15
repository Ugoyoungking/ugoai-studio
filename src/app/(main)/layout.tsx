'use client';
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/sidebar"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  // In a real app, you'd use a hook like useUser() from your auth provider
  const [user, setUser] = useState<{email: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a user session.
    // In a real app, this would be a call to Firebase Auth.
    // For now, we'll simulate a logged-out user to enforce the redirect.
    const checkUser = async () => {
      // Replace this with: const authUser = await getCurrentUser();
      await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async check
      const authUser = null; 
      setUser(authUser);
      setLoading(false);
    }
    checkUser();
  }, []);

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
