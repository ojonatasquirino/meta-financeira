import { FinancialGoalPlanner } from "@/components/financial-goal-planner";
import { Github, Linkedin, Instagram, AtSign, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-2 container sm:px-8 sm:py-8">
        <FinancialGoalPlanner />
      </main>
      <footer className="border-t py-4 bg-background">
        <div className="container px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-2">
          <p>{new Date().getFullYear()} © Jônatas Quirino</p>

          <div className="flex gap-4">
            <a
              href="https://github.com/ojonatasquirino"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/jonatasquirino"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href="https://www.instagram.com/ojonatasquirino"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <a
              href="https://www.threads.net/@ojonatasquirino"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <AtSign className="h-5 w-5" />
            </a>

            <a
              href="https://ojonatasquirino.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
