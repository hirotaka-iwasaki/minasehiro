import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const updateTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const handleToggleClick = () => {
    const element = document.documentElement;

    // if not supported, just toggle the theme
    if (!document.startViewTransition) {
      element.classList.toggle('dark');
      updateTheme();
      return;
    }

    document.startViewTransition(() => {
      element.classList.toggle('dark');
      updateTheme();
    });
  };

  return (
    <button
      onClick={handleToggleClick}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}
