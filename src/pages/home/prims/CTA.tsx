import React from 'react';
import { Button } from "@/components/ui/button";

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-framecraft-gray-dark text-white">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your <span className="text-framecraft-blue-light">Architectural Process</span>?
            </h2>
            <p className="text-lg text-gray-300 md:text-xl">
              Join thousands of architects, designers, and homeowners who are revolutionizing how floor plans are created.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-framecraft-blue-light mb-2">10,000+</div>
            <p className="text-sm text-gray-300">Floor Plans Generated</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-framecraft-blue-light mb-2">98%</div>
            <p className="text-sm text-gray-300">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-framecraft-blue-light mb-2">30+</div>
            <p className="text-sm text-gray-300">Countries Using FrameCraft</p>
          </div>
        </div>
      </div>
    </section>
  );
};