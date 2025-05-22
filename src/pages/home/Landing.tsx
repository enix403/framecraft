import { Navbar } from "./prims/Navbar";
import { Hero } from "./prims/Hero";
import { Features } from "./prims/Features";
import { Workflow } from "./prims/Workflow";
import { Demo } from "./prims/Demo";
import { Export } from "./prims/Export";
import { CTA } from "./prims/CTA";
import { Footer } from "./prims/Footer";
import { useThemeToggle } from "@/components/ui/theme-toggle-button";
import { useLayoutEffect } from "react";
import { useTheme } from "@/components/theme-provider";

export const LandingPage = () => {
  const toggleTheme = useThemeToggle({});
  const { theme } = useTheme();
  useLayoutEffect(() => {
    if (theme !== "light") toggleTheme();
  }, [theme]);

  return (
    <div className='max-h-full min-h-screen overflow-auto'>
      <Navbar />
      <main className=''>
        <Hero />
        <Features />
        <Workflow />
        <Demo />
        <Export />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};
