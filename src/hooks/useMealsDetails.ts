import { useEffect, useState } from "react";
import { getMealById } from "../api/api";
import type { Meal } from "../types";

export default function useMealsDetails(id: number) {
  const [data, setData] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getMealById(id)
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
  }, [id]);

  return { data, loading, error };
}
