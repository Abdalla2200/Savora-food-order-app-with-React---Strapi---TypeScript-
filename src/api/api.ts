import type {
  Category,
  CategoryRaw,
  Meal,
  MealRaw,
  StrapiList,
} from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

// ─── The one core fetcher ─────────────────────────────────

async function apiFetch<T>(
  endPoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endPoint}`, options);

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error?.message || `Error ${response.status}`);

  return data;
}

// ─── One function per API call ────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const res = await apiFetch<StrapiList<CategoryRaw>>(
    "/categories?populate=image",
  );

  return res.data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    image: `${STRAPI_URL}${item.image.url}`,
  }));
}
export async function getMealsByCategory(categoryId: number): Promise<Meal[]> {
  const res = await apiFetch<StrapiList<MealRaw>>(
    `/meals?filters[category][id][$eq]=${categoryId}&populate=image`,
  );

  return res.data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    image: `${STRAPI_URL}${item.image.url}`,
  }));
}
export async function getMealById(id: number): Promise<Meal> {
  const res = await apiFetch<StrapiList<MealRaw>>(
    `/meals?filters[id][$eq]=${id}&populate=image`,
  );

  const item = res.data[0];

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    image: `${STRAPI_URL}${item.image.url}`,
  };
}

export async function getCategoryById(id: number): Promise<Category> {
  const res = await apiFetch<StrapiList<CategoryRaw>>(
    `/categories?filters[id][$eq]=${id}&populate=image`,
  );

  const item = res.data[0];

  if (!item) {
    throw new Error("Category not found");
  }

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    image: `${STRAPI_URL}${item.image.url}`,
  };
}

export async function submitOrder(payload: object, token: string) {
  return apiFetch<{ data: { id: number } }>("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: payload }),
  });
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  return apiFetch<{ jwt: string; user: { username: string } }>(
    "/auth/local/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    },
  );
}

export async function loginUser(identifier: string, password: string) {
  return apiFetch<{ jwt: string; user: { username: string } }>("/auth/local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });
}
