
'use client';
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/sidebar"
import { useEffect } from "react";
import { useUser } from "@/firebase/auth/use-user";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { usePathname, useRouter } from "next/navigation";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const { requestNotificationPermission, initializeScheduledNotification, isSubscribed } = usePushNotifications();

  useEffect(() => {
    if (loading) return;

    // If user is not logged in, redirect them to the login page.
    if (!user) {
      router.replace('/login');
    }

  }, [loading, user, router]);

   useEffect(() => {
    // Request notification permission once the user is logged in
    // and the component has mounted.
    if (user && typeof window !== 'undefined') {
      const permissionRequested = localStorage.getItem('notificationPermissionRequested');
      if (!permissionRequested) {
        // Delay the request slightly to not overwhelm the user immediately on login
        setTimeout(() => {
          requestNotificationPermission();
          localStorage.setItem('notificationPermissionRequested', 'true');
        }, 5000); 
      }
    }
  }, [user, requestNotificationPermission]);

  useEffect(() => {
    // When the app loads and we know the user is subscribed, re-initialize the scheduler
    if(isSubscribed) {
      initializeScheduledNotification();
    }
  }, [isSubscribed, initializeScheduledNotification]);


  if (loading || !user) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
       </div>
    );
  }

  // At this point, user is logged in. Show the full app shell.
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
