import type { ImageMetadata } from 'astro';

/**
 * Shared prop types for layouts, ui primitives and widgets.
 *
 * Widgets follow the AstroWind convention: every prop is optional and can come
 * either from the frontmatter of the page (an object) or from a named slot when
 * the page needs richer markup.
 */

export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;
  canonical?: string;
  robots?: MetaDataRobots;
  description?: string;
  keywords?: string[];
  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  cardType?: string;
  site?: string;
  handle?: string;
}

/** Per-widget class overrides (`container`, `headline.title`, …). */
export interface WidgetClasses {
  container?: string;
  headline?: Record<string, string>;
  [key: string]: unknown;
}

/** Common layout props shared by every widget. */
export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: WidgetClasses;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
}

export interface CallToAction {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  href?: string;
  icon?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  ariaLabel?: string;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: string;
  href?: string;
  callToAction?: CallToAction;
  classes?: Record<string, string>;
}

export interface Stat {
  amount?: number | string;
  title?: string;
  icon?: string;
}

export interface Metric extends Stat {
  description?: string;
}

export interface HeroImage {
  src: string | ImageMetadata;
  alt?: string;
  width?: number;
  height?: number;
  /** `cover` crops to the frame (default), `auto` shows the picture whole. */
  aspect?: 'cover' | 'auto';
}

export interface Hero extends Omit<Headline, 'classes'>, Omit<Widget, 'isDark' | 'classes'> {
  badge?: string;
  content?: string;
  actions?: string | CallToAction[];
  image?: string | HeroImage;
}

export interface Stats extends Omit<Headline, 'classes'>, Widget {
  stats?: Array<Stat>;
}

export interface Metrics extends Omit<Headline, 'classes'>, Widget {
  metrics?: Array<Metric>;
  image?: string | HeroImage;
  isReversed?: boolean;
}

export interface Features extends Omit<Headline, 'classes'>, Widget {
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
}

export interface Features2 extends Omit<Headline, 'classes'>, Widget {
  items?: Array<Item>;
  columns?: number;
}

export interface Steps extends Omit<Headline, 'classes'>, Widget {
  items?: Array<Item>;
  callToAction?: CallToAction;
}

export interface Content extends Omit<Headline, 'classes'>, Widget {
  content?: string;
  image?: string | HeroImage;
  items?: Array<Item>;
  isReversed?: boolean;
  callToAction?: CallToAction;
}

export interface Faqs extends Omit<Headline, 'classes'>, Widget {
  items?: Array<Item>;
  columns?: number;
}

export interface Brands extends Omit<Headline, 'classes'>, Widget {
  icons?: Array<string>;
  items?: Array<{ name: string; icon?: string; href?: string }>;
  variant?: 'grid' | 'inline';
}

export interface Note extends Widget {
  title?: string;
  text?: string;
  icon?: string;
  link?: CallToAction;
}

export interface PageHeader extends Omit<Headline, 'classes'>, Widget {
  badge?: string;
  actions?: Array<CallToAction>;
}

export interface TimelineEntry {
  label: string;
  title: string;
  description?: string;
  icon?: string;
}
