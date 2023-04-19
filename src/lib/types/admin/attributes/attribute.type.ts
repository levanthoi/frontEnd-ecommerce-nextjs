export interface IAttribute {
  key: string;
  title: string;
  slug: string;
  description?: string;
  variants: Array<{ name: string; value?: string }>;
}
