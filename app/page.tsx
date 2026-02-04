import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Trend Client</h1>
          <p className="text-muted-foreground">
            Next.js 16 application with shadcn/ui, TanStack Query, and more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Setup Complete</CardTitle>
              <CardDescription>
                Your project is configured with all required dependencies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Ready for Figma design implementation.
              </p>
              <Button>Get Started</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Modern tools for rapid development</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Next.js 16 with App Router</li>
                <li>TypeScript (strict mode)</li>
                <li>Tailwind CSS v4</li>
                <li>shadcn/ui (new-york style)</li>
                <li>TanStack Query v5</li>
                <li>React Hook Form + Zod</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
