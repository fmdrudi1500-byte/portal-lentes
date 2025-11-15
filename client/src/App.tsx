import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import InstallPWA from "./components/InstallPWA";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import LensDetail from "./pages/LensDetail";
import Compare from "./pages/Compare";
import Calculator from "./pages/Calculator";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Quiz} />
      <Route path={"/quiz-results"} component={QuizResults} />
      <Route path={"/catalog"} component={Home} />
      <Route path={"/lens/:id"} component={LensDetail} />
      <Route path={"/compare"} component={Compare} />
      <Route path={"/calculator"} component={Calculator} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <InstallPWA />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
