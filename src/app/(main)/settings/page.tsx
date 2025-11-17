"use client"

import { useUser } from "@/firebase/auth/use-user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { usePushNotifications } from "@/hooks/use-push-notifications"
import { useState } from "react"
import { BellRing, BellOff } from "lucide-react"

export default function SettingsPage() {
  const { user } = useUser()
  const auth = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const { 
    requestNotificationPermission, 
    isSubscribed, 
    scheduleDailyNotification, 
    cancelDailyNotifications,
    getScheduledTime 
  } = usePushNotifications()
  const [notificationTime, setNotificationTime] = useState(getScheduledTime() || "16:00")

  const handleLogout = async () => {
    if (!auth) return
    try {
      await signOut(auth)
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Error signing out: ", error)
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      })
    }
  }

  const handleScheduleNotification = () => {
    if (!isSubscribed) {
      toast({
        variant: "destructive",
        title: "Notifications not enabled",
        description: "Please enable push notifications first.",
      });
      requestNotificationPermission();
      return;
    }
    const [hours, minutes] = notificationTime.split(':').map(Number);
    scheduleDailyNotification(hours, minutes);
    toast({
      title: "Notifications Scheduled",
      description: `You will receive a notification daily at ${notificationTime}.`,
    });
  }
  
  const handleCancelNotifications = () => {
    cancelDailyNotifications();
    toast({
      title: "Notifications Canceled",
      description: "You will no longer receive daily notifications.",
    });
  }

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Settings
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is your public display name and email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" value={user?.displayName || 'Not set'} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ''} disabled />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Schedule a daily reminder notification.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notificationTime">Daily Notification Time</Label>
            <Input 
              id="notificationTime" 
              type="time"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="w-full md:w-1/2"
              disabled={!isSubscribed}
             />
          </div>
           {!isSubscribed && (
             <p className="text-sm text-muted-foreground">
               You need to <Button variant="link" className="p-0 h-auto" onClick={requestNotificationPermission}>enable notifications</Button> to set a schedule.
             </p>
           )}
        </CardContent>
         <CardFooter className="flex-col sm:flex-row gap-2">
          <Button onClick={handleScheduleNotification} disabled={!isSubscribed}>
            <BellRing className="mr-2" />
            Schedule Notification
          </Button>
          <Button onClick={handleCancelNotifications} variant="outline" disabled={!isSubscribed}>
            <BellOff className="mr-2" />
            Cancel All
          </Button>
        </CardFooter>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Logout</CardTitle>
          <CardDescription>
            Sign out of your account on this device.
          </Description>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
