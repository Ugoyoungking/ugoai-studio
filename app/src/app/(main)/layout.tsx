
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
    if (loading) return;

    // The landing page lives at the root, so if user is logged in and at root, send them to chat.
    if (user && pathname === '/') {
      redirect('/chat');
    }
    
    // These paths are public and don't need the app shell or auth.
    const publicPaths = ['/login', '/signup', '/forgot-password', '/privacy', '/terms', '/how-to-use', '/profile', '/faq'];

    // If the user is not logged in and not on a public page (and not on root), redirect to login.
    if (!user && !publicPaths.includes(pathname) && pathname !== '/') {
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
  
  // Define pages that don't get the app shell (sidebar, header, etc.)
  const noShellPages = ['/', '/login', '/signup', '/forgot-password', '/privacy', '/terms', '/how-to-use', '/profile', '/faq'];

  if (noShellPages.includes(pathname)) {
    // If user is not logged in and on the landing page, show it.
    if (!user && pathname === '/') {
        return <>{children}</>;
    }
    // If user is logged in, they are redirected to /chat, so we don't need to handle that here.
    // Auth pages are always shown without shell for non-logged-in users.
    if (!user && (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password')) {
       return <>{children}</>;
    }
    // Public info pages are always shown without the shell.
    if (['/privacy', '/terms', '/how-to-use', '/profile', '/faq'].includes(pathname)){
       return <>{children}</>;
    }
  }


  // If user is not logged in and trying to access a protected page, show a redirecting message.
  if (!user && !noShellPages.includes(pathname)) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <p>Redirecting to login...</p>
       </div>
    );
  }
  
  // If we're at the root path, but the user is logged in, they should be redirected.
  // This avoids showing a blank page while redirecting.
  if (user && pathname === '/') {
     return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <p>Redirecting to your dashboard...</p>
       </div>
    );
  }

  // At this point, user is logged in and on a protected page. Show the full app shell.
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
