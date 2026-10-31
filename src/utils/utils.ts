import { twMerge } from 'tailwind-merge';

/** Merges conditional class strings, letting later Tailwind classes win. */
export const mergeClasses = (...classes: Array<string | Record<string, boolean> | undefined | false | null>): string =>
  twMerge(
    classes
      .flatMap((value) => {
        if (!value) return [];
        if (typeof value === 'string') return [value];
        return Object.entries(value)
          .filter(([, enabled]) => enabled)
          .map(([name]) => name);
      })
      .join(' ')
  );

/** Grid column classes used by widgets that render an `items` collection. */
export const getColumnsClass = (columns = 1): string => {
  switch (columns) {
    case 2:
      return 'md:grid-cols-2';
    case 3:
      return 'md:grid-cols-2 lg:grid-cols-3';
    case 4:
      return 'md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'md:grid-cols-1';
  }
};

/** `1` → `01`, used by step and index markers. */
export const padIndex = (index: number, size = 2): string => String(index).padStart(size, '0');
