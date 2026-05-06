// ─── Strapi wrapper (always the same shape) ───────────────

export interface StrapiList<T> {
  data: (T & { id: number })[];
}

// ─── Your actual data shapes ──────────────────────────────

export interface CategoryRaw {
  id: number;
  name: string;
  description: string;
  image: { url: string };
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}
export interface MealRaw {
  id: number;
  title: string;
  price: number;
  description: string;
  image: {
    url: string; // full image
  };
}

export interface Meal {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
