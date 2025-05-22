import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";

const features = [
  {
    title: "Constraint-Based Design",
    description:
      "Specify plot dimensions, desired room counts, and spatial constraints to generate plans that perfectly fit your needs.",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-8 w-8 text-framecraft-blue'
      >
        <rect width='18' height='18' x='3' y='3' rx='2'></rect>
        <path d='M3 9h18'></path>
        <path d='M9 21V9'></path>
      </svg>
    )
  },
  {
    title: "Interactive Graph Layout Editor",
    description:
      "Create connections between rooms with our intuitive graph editor that turns abstract space relationships into concrete floor plans.",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-8 w-8 text-framecraft-blue'
      >
        <path d='M3 8V5a2 2 0 0 1 2-2h3'></path>
        <path d='M21 8V5a2 2 0 0 0-2-2h-3'></path>
        <path d='M3 16v3a2 2 0 0 0 2 2h3'></path>
        <path d='M21 16v3a2 2 0 0 1-2 2h-3'></path>
        <circle cx='8' cy='8' r='2'></circle>
        <circle cx='16' cy='16' r='2'></circle>
      </svg>
    )
  },
  {
    title: "AI-Powered Generation",
    description:
      "Our advanced artificial intelligence generates multiple floor plan options based on your inputs and spatial requirements.",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-8 w-8 text-framecraft-blue'
      >
        <path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z'></path>
        <path d='M7 7h.01'></path>
      </svg>
    )
  },
  {
    title: "Interactive Floor Plan Viewer",
    description:
      "Explore generated floor plans with our interactive viewer. Zoom, pan, and navigate through your design with ease.",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-8 w-8 text-framecraft-blue'
      >
        <path d='m21 21-6-6m6 6v-4.8m0 4.8h-4.8'></path>
        <path d='M3 16.2V21m0-4.8H7.8'></path>
        <path d='M21 7.8V3m0 4.8h-4.8'></path>
        <path d='M3 3v4.8M3 3h4.8'></path>
      </svg>
    )
  },
  {
    title: "3D Visualization",
    description:
      "Instantly convert your 2D floor plans into explorable 3D models to better understand spatial relationships and flow.",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-8 w-8 text-framecraft-blue'
      >
        <path d='M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z'></path>
      </svg>
    )
  },
  {
    title: "Industry-Standard Export",
    description:
      "Export your designs to DXF and PDF formats for seamless integration with professional architectural software.",
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='h-8 w-8 text-framecraft-blue'
      >
        <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z'></path>
        <polyline points='14 2 14 8 20 8'></polyline>
        <path d='M12 18v-6'></path>
        <path d='m9 15 3 3 3-3'></path>
      </svg>
    )
  }
];

function Pill({ label }) {
  return (
    <div className='group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]'>
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box"
        }}
      />
      🎉 <hr className='mx-2 h-4 w-px shrink-0 bg-neutral-500' />
      <AnimatedGradientText className='text-sm font-medium'>
        {label}
      </AnimatedGradientText>
      <ChevronRight className='ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
    </div>
  );
}

export const Features: React.FC = () => {
  return (
    <section id='features' className='bg-framecraft-gray py-20'>
      <div className='px-4 md:px-6'>
        <div className='mb-16 flex flex-col items-center justify-center space-y-4 text-center'>
          {/* <div className="inline-block rounded-lg bg-framecraft-blue/10 px-3 py-1 text-sm text-framecraft-blue-dark">
            Powerful Features
          </div> */}
          <Pill label='Powerful Features' />
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Everything You Need for Floor Plan Design
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl'>
            FrameCraft combines architectural principles with artificial
            intelligence to create floor plans that are both beautiful and
            functional.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='group overflow-hidden border bg-background transition-shadow hover:shadow-lg'
            >
              <CardContent className='p-6'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-framecraft-blue/10 transition-colors group-hover:bg-framecraft-blue/20'>
                  {feature.icon}
                </div>
                <h3 className='mb-2 text-xl font-bold'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
