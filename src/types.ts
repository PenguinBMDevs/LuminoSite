/** Shared prop types. */

export interface MetaData {
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  canonical?: string;
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
