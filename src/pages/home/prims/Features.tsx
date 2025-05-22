import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Constraint-Based Design",
    description: "Specify plot dimensions, desired room counts, and spatial constraints to generate plans that perfectly fit your needs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-framecraft-blue">
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M3 9h18"></path>
        <path d="M9 21V9"></path>
      </svg>
    )
  },
  {
    title: "Interactive Graph Layout Editor",
    description: "Create connections between rooms with our intuitive graph editor that turns abstract space relationships into concrete floor plans.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-framecraft-blue">
        <path d="M3 8V5a2 2 0 0 1 2-2h3"></path>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
        <path d="M21 16v3a2 2 0 0 1-2 2h-3"></path>
        <circle cx="8" cy="8" r="2"></circle>
        <circle cx="16" cy="16" r="2"></circle>
      </svg>
    )
  },
  {
    title: "AI-Powered Generation",
    description: "Our advanced artificial intelligence generates multiple floor plan options based on your inputs and spatial requirements.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-framecraft-blue">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
        <path d="M7 7h.01"></path>
      </svg>
    )
  },
  {
    title: "Interactive Floor Plan Viewer",
    description: "Explore generated floor plans with our interactive viewer. Zoom, pan, and navigate through your design with ease.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-framecraft-blue">
        <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
        <path d="M3 16.2V21m0-4.8H7.8"></path>
        <path d="M21 7.8V3m0 4.8h-4.8"></path>
        <path d="M3 3v4.8M3 3h4.8"></path>
      </svg>
    )
  },
  {
    title: "3D Visualization",
    description: "Instantly convert your 2D floor plans into explorable 3D models to better understand spatial relationships and flow.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-framecraft-blue">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
      </svg>
    )
  },
  {
    title: "Industry-Standard Export",
    description: "Export your designs to DXF and PDF formats for seamless integration with professional architectural software.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-framecraft-blue">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M12 18v-6"></path>
        <path d="m9 15 3 3 3-3"></path>
      </svg>
    )
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-framecraft-gray">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-framecraft-blue/10 px-3 py-1 text-sm text-framecraft-blue-dark">
            Powerful Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need for Floor Plan Design
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            FrameCraft combines architectural principles with artificial intelligence to create floor plans that are both beautiful and functional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden bg-background hover:shadow-lg transition-shadow border group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-framecraft-blue/10 flex items-center justify-center mb-4 group-hover:bg-framecraft-blue/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
