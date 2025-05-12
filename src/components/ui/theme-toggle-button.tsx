import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../theme-provider";

import { Button } from "@/components/ui/button";

import {
  AnimationStart,
  AnimationVariant,
  createAnimation
} from "./theme-animations";

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  url?: string;
}

export function useThemeToggle({
  variant = "circle-blur",
  start = "bottom-right"
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme();

  const styleId = "theme-transition-styles";

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, "");

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme]);

  return toggleTheme;
}

export function ThemeToggleButton({
  variant = "circle-blur",
  start = "bottom-right"
}: ThemeToggleAnimationProps) {
  const toggleTheme = useThemeToggle({ variant, start });

  return (
    <Button
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className='group relative h-9 w-9 p-0'
      name='Theme Toggle Button'
    >
      <SunIcon className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <MoonIcon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
    </Button>
  );
}
