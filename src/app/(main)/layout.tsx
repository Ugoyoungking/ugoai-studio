
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
    // These paths are public
    const publicPaths = ['/login', '/signup', '/forgot-password', '/privacy', '/terms', '/how-to-use', '/profile', '/faq'];
    
    // If the path is the root page, we allow it for logged-in users.
    if (pathname === '/') {
        return;
    }
    
    // Redirect to login if user is not loaded and not on a public path.
    if (!loading && !user && !publicPaths.includes(pathname)) {
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
  
  if (!user && pathname !== '/') {
    // This will be shown briefly before the redirect fires for protected routes.
    // Or if the redirect fails for some reason.
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40 items-center justify-center">
        <p>Redirecting to login...</p>
       </div>
    );
  }
  
  // Logic to determine which layout to show
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(pathname);
  const isInfoPage = ['/privacy', '/terms', '/how-to-use', '/profile', '/faq'].includes(pathname);

  // If it's the root page, an auth page or an info page, show children without the main app shell.
  // The root page now has its own header/footer.
  if (pathname === '/' || isAuthPage || isInfoPage) {
    return <>{children}</>;
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
