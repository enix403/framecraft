import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a simplified 3D effect using canvas for the landing page
    // In a real implementation, you would use Three.js or React Three Fiber
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = containerRef.current;
    if (!container) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // House blueprint lines
    const lines: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }[] = [];

    // Create house blueprint effect
    for (let i = 0; i < 15; i++) {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      const length = 50 + Math.random() * 100;
      const angle = Math.random() * Math.PI * 2;

      lines.push({
        x1: startX,
        y1: startY,
        x2: startX + Math.cos(angle) * length,
        y2: startY + Math.sin(angle) * length,
        color: `rgba(59, 130, 246, ${0.2 + Math.random() * 0.3})`
      });
    }

    // Create some room shapes
    for (let i = 0; i < 5; i++) {
      const size = 40 + Math.random() * 60;
      const x = Math.random() * (canvas.width - size);
      const y = Math.random() * (canvas.height - size);

      // Create a room (rectangle)
      lines.push({
        x1: x,
        y1: y,
        x2: x + size,
        y2: y,
        color: `rgba(59, 130, 246, ${0.8 + Math.random() * 0.15})`
      });
      lines.push({
        x1: x + size,
        y1: y,
        x2: x + size,
        y2: y + size,
        color: `rgba(59, 130, 246, ${0.8 + Math.random() * 0.15})`
      });
      lines.push({
        x1: x + size,
        y1: y + size,
        x2: x,
        y2: y + size,
        color: `rgba(59, 130, 246, ${0.8 + Math.random() * 0.15})`
      });
      lines.push({
        x1: x,
        y1: y + size,
        x2: x,
        y2: y,
        color: `rgba(59, 130, 246, ${0.8 + Math.random() * 0.15})`
      });
    }

    // Animation variables
    let frameId: number;
    let rotation = 0;

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slowly rotate the entire scene for a subtle 3D effect
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Draw lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.restore();

      // Update rotation for next frame
      rotation += 0.001;

      // Continue animation
      frameId = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className='relative flex min-h-[90vh] items-center'>
      <div className='absolute inset-0 overflow-hidden' ref={containerRef}>
        <canvas ref={canvasRef} className='h-full w-full opacity-40' />
      </div>

      <div className='relative z-10 grid gap-8 px-5 pt-16 md:px-8 lg:grid-cols-2 xl:px-18'>
        <div className='flex flex-col justify-center space-y-6'>
          <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
            <span className='text-gradient block'>Design Your Dream</span>
            <span className='block'>With AI-Powered Architecture</span>
          </h1>

          <p className='max-w-prose text-xl text-muted-foreground'>
            Define constraints, create layout graphs, and generate beautiful,
            functional floor plans instantly with FrameCraft's AI technology.
          </p>

          <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
            <Button asChild size='lg' className='text-lg'>
              <Link to='/app'>Start Designing Now</Link>
            </Button>
            {/* <Button variant="outline" size="lg" className="text-lg">
              View Examples
            </Button> */}
          </div>

          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div> */}
        </div>

        <div className='relative flex h-[400px] w-full items-center justify-center lg:h-[600px]'>
          <div className='absolute top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-framecraft-blue/10 blur-xl'></div>
          <div className='relative h-[80%] w-[80%] overflow-hidden rounded-lg border bg-white shadow-xl'>
            <div className='absolute top-0 right-0 left-0 flex h-8 items-center border-b bg-framecraft-gray px-4'>
              <div className='flex gap-2'>
                <div className='h-3 w-3 rounded-full bg-red-400'></div>
                <div className='h-3 w-3 rounded-full bg-yellow-400'></div>
                <div className='h-3 w-3 rounded-full bg-green-400'></div>
              </div>
            </div>
            <div className='h-full bg-framecraft-gray pt-8'>
              <img
                src='https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                alt='House floor plan'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-6 left-1/2 flex -translate-x-1/2 transform animate-bounce flex-col items-center'>
        <span className='mb-2 text-sm text-muted-foreground'>
          Scroll to explore
        </span>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-6 w-6'
        >
          <path d='M12 5v14'></path>
          <path d='m19 12-7 7-7-7'></path>
        </svg>
      </div>
    </div>
  );
};
