import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Trend Client</h1>
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        <Card>
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
    </main>
  );
}
