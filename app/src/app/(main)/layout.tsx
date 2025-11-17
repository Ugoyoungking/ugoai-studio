
'use client';
import { Header } from "@/components/layout/header"
import { AppSidebar } from "@/components/layout/sidebar"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/firebase/auth/use-user";
import { usePushNotifications } from "@/hooks/use-push-notifications";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const { requestNotificationPermission, initializeScheduledNotification, isSubscribed } = usePushNotifications();

  useEffect(() => {
    // If we're still loading, don't do anything.
    if (loading) return;

    // These paths do not require authentication.
    const publicPaths = ['/login', '/signup', '/forgot-password', '/privacy', '/terms', '/how-to-use', '/profile', '/faq'];

    // If the user is not logged in and not on the landing page or a public page, redirect to login.
    if (!user && pathname !== '/' && !publicPaths.includes(pathname)) {
      redirect('/login');
    }

  }, [loading, user, pathname]);

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


  if (loading) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
       </div>
    );
  }
  
  // Public pages and auth pages should not have the main app shell
  const isPublicPage = ['/', '/login', '/signup', '/forgot-password', '/privacy', '/terms', '/how-to-use', '/profile', '/faq'].includes(pathname);

  if (isPublicPage) {
     if (!user && pathname === '/') {
        return <>{children}</>;
     }
     if (user && pathname === '/') {
        // Logged-in users at root see the app shell
     } else if (!user && (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password')) {
       return <>{children}</>;
     } else if (['/privacy', '/terms', '/how-to-use', '/profile', '/faq'].includes(pathname)){
       return <>{children}</>; // Info pages are always public
     }
  }

  // If user is not logged in and trying to access a protected page, show a redirecting message.
  if (!user && !isPublicPage) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <p>Redirecting to login...</p>
       </div>
    );
  }

  // At this point, user is logged in, show the full app shell.
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
