export interface Lens {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  category: string;
  tagline: string;
  image: string;
  description: string;
  keyFeatures: string[];
  technology: {
    title: string;
    description: string;
  };
  clinicalData: {
    [key: string]: string | string[];
  };
  specifications: {
    [key: string]: string | string[];
  };
  advantages: string[];
  indications: string[];
  references?: string[];
}

export interface LensesData {
  lenses: Lens[];
}
