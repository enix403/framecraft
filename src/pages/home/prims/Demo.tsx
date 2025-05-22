import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="examples" className="py-20 bg-framecraft-blue/5">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-framecraft-blue/10 px-3 py-1 text-sm text-framecraft-blue-dark">
            See It In Action
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Experience FrameCraft
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Watch how easy it is to go from concept to complete floor plan
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-black">
            {/* This would be replaced with an actual video player */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying && (
                <Button
                  onClick={() => setIsPlaying(true)}
                  className="h-16 w-16 rounded-full bg-framecraft-blue hover:bg-framecraft-blue-dark"
                  variant="default"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </Button>
              )}
              <img
                // src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                src="https://image.lexica.art/full_webp/5aa928ec-d620-4465-9d2c-fb0742e2c924"
                alt="Demo video thumbnail"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="constraints" className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="constraints">Constraints</TabsTrigger>
                <TabsTrigger value="layout">Layout Graph</TabsTrigger>
                <TabsTrigger value="result">Final Design</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="constraints" className="bg-white rounded-lg shadow-md p-6 border animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Setting Your Parameters</h3>
                  <p className="text-muted-foreground mb-4">
                    FrameCraft starts with understanding your requirements. Specify the total area, number of bedrooms,
                    bathrooms, and other spaces you need in your design.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Start creating a new project</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Give it a name</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Define plot dimensions</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-framecraft-gray rounded-lg p-4 flex items-center justify-center">
                  <div className="w-full h-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-framecraft-blue/30 rounded-md overflow-hidden">
                    {/* <span className="text-muted-foreground">Constraint Interface Preview</span> */}
                    <img src="/workflow/one.png" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="layout" className="bg-white rounded-lg shadow-md p-6 border animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Creating Your Layout Graph</h3>
                  <p className="text-muted-foreground mb-4">
                    The interactive graph editor allows you to define relationships between spaces. Connect rooms
                    that should be adjacent and specify the desired flow through your home.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Add room nodes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Connect adjacent spaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Define flow and circulation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-framecraft-gray rounded-lg p-4 flex items-center justify-center">
                  <div className="w-full h-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-framecraft-blue/30 rounded-md overflow-hidden">
                    {/* <span className="text-muted-foreground">Graph Editor Preview</span> */}
                    <img src="/workflow/two.png" />

                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="result" className="bg-white rounded-lg shadow-md p-6 border animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Your Finished Floor Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    The AI generates multiple floor plan options that satisfy your constraints and layout requirements.
                    Explore them in 2D and 3D before exporting for further refinement.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Choose from multiple options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>View in interactive 3D</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-framecraft-blue">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="m4.93 4.93 2.83 2.83"></path>
                        <path d="m16.24 16.24 2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="m4.93 19.07 2.83-2.83"></path>
                        <path d="m16.24 7.76 2.83-2.83"></path>
                      </svg>
                      <span>Export in industry formats</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-framecraft-gray rounded-lg p-4 flex items-center justify-center">
                  <div className="w-full h-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-framecraft-blue/30 rounded-md overflow-hidden">
                    <img src="/workflow/three.png" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};