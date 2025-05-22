import React from 'react';
import { Button } from "@/components/ui/button";

export const Export: React.FC = () => {
  return (
    <section id="export" className="py-20 bg-gradient-to-br from-framecraft-blue-light/20 to-framecraft-blue/30">
      <div className="px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block rounded-lg bg-framecraft-blue/10 px-3 py-1 text-sm text-framecraft-blue-dark w-fit">
              Export Options
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Take Your Design Further
            </h2>
            <p className="text-lg text-muted-foreground">
              FrameCraft seamlessly integrates with professional design tools. Export your floor plans in industry-standard formats for further refinement or presentation.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 mr-4 rounded-full bg-framecraft-blue/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-framecraft-blue">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">PDF Export</h3>
                  <p className="text-sm text-muted-foreground">Perfect for sharing with clients or contractors</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-12 w-12 mr-4 rounded-full bg-framecraft-blue/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-framecraft-blue">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">DXF Export</h3>
                  <p className="text-sm text-muted-foreground">Compatible with AutoCAD and other CAD software</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-12 w-12 mr-4 rounded-full bg-framecraft-blue/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-framecraft-blue">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">3D Model Export</h3>
                  <p className="text-sm text-muted-foreground">Take your design into Blender or SketchUp</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Start Designing Now</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden rounded-xl border bg-white p-2 shadow-xl">
            <div className="absolute inset-0 bg-framecraft-gray/50 flex flex-col">
              <div className="h-10 bg-framecraft-gray-dark flex items-center px-4 py-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center text-white text-xs font-bold">Floor Plan Export</div>
              </div>

              <div className="flex-1 p-6 grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-3 animate-float">
                  <div className="aspect-square bg-framecraft-blue/10 rounded-md mb-2"></div>
                  <div className="h-4 bg-framecraft-gray rounded mb-1"></div>
                  <div className="h-3 bg-framecraft-gray rounded w-2/3"></div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-3 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="aspect-square bg-framecraft-blue/10 rounded-md mb-2"></div>
                  <div className="h-4 bg-framecraft-gray rounded mb-1"></div>
                  <div className="h-3 bg-framecraft-gray rounded w-2/3"></div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-3 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="aspect-square bg-framecraft-blue/10 rounded-md mb-2"></div>
                  <div className="h-4 bg-framecraft-gray rounded mb-1"></div>
                  <div className="h-3 bg-framecraft-gray rounded w-2/3"></div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-3 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="aspect-square bg-framecraft-blue/10 rounded-md mb-2"></div>
                  <div className="h-4 bg-framecraft-gray rounded mb-1"></div>
                  <div className="h-3 bg-framecraft-gray rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
