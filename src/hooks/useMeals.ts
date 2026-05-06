import { useEffect, useState } from "react";
import { getMealsByCategory } from "../api/api";
import type { Meal } from "../types";

export default function useMeals(categoryId: number) {
  const [data, setData] = useState<Meal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    getMealsByCategory(categoryId)
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch((error) => {
        if (isMounted) setError(error.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return { data, loading, error };
}
