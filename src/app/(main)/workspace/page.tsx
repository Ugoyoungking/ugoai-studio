import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WorkspacePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          My Workspace
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your central hub for notes, tasks, and all your AI creations.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The integrated workspace is under construction. Soon, you&apos;ll be able
            to manage your notes, tasks, saved chats, and generated images all
            in one place, with offline access and cloud sync.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
