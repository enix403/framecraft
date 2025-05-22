
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Define Your Constraints",
    description: "Start by specifying your plot size, desired number of rooms, and any architectural constraints that matter to your project.",
    // image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    image: "https://image.lexica.art/full_webp/102e7fb4-76c4-45dc-86e8-d9873877be59"
  },
  {
    number: "02",
    title: "Create Your Layout Graph",
    description: "Use our interactive graph editor to define which rooms should connect to each other and their relative positions.",
    // image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    image: "https://image.lexica.art/full_webp/6f9516b9-9c1f-4d7f-a33c-7f4e5ab024e0"
  },
  {
    number: "03",
    title: "Generate Floor Plans",
    description: "Let our AI analyze your constraints and layout graph to generate multiple floor plan options that meet your requirements.",
    // image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    image: "https://image.lexica.art/full_webp/7482134e-2452-4aeb-a960-50debce36590"
  },
  {
    number: "04",
    title: "Explore in 3D",
    description: "View your selected floor plan in 3D to get a better understanding of spaces and flow throughout the design.",
    // image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    image: "https://image.lexica.art/full_webp/d5d1eed6-a99f-4b87-8af4-4ad65f02afe2"
  },
  {
    number: "05",
    title: "Export Your Design",
    description: "Export your design to industry-standard formats like DXF or PDF for further refinement in professional software.",
    // image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    image: "https://image.lexica.art/full_webp/0d866200-84ba-412c-bb09-075fe917c168"
  }
];

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-20">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-framecraft-blue/10 px-3 py-1 text-sm text-framecraft-blue-dark">
            Simple Process
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How FrameCraft Works
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Transform your ideas into architectural designs in five easy steps
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <Card key={index} className={`overflow-hidden border-none bg-transparent shadow-none ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className={`relative overflow-hidden rounded-lg border ${index % 2 === 0 ? 'animate-fade-in' : 'animate-fade-in-delay'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-framecraft-blue/20 to-transparent"></div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ aspectRatio: "16/9" }}
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-6">
                  <div className="mb-2 flex items-center">
                    <span className="text-3xl font-bold text-framecraft-blue">{step.number}</span>
                    <div className="ml-3 h-px flex-1 bg-framecraft-blue/30" />
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
