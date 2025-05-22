import { Navbar } from "./prims/Navbar";
import { Hero } from "./prims/Hero";
import { Features } from "./prims/Features";
import { Workflow } from "./prims/Workflow";
import { Demo } from "./prims/Demo";
import { Export } from "./prims/Export";
import { CTA } from "./prims/CTA";
import { Footer } from "./prims/Footer";

export const LandingPage = () => {
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
