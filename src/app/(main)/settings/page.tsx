import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Settings
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Personalize your UGO AI Studio experience.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The settings page is currently under development. Here you will be
            able to manage your account, change the theme, select your preferred
            AI models, and customize your notification settings.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
