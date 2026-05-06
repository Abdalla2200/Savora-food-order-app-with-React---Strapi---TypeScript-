import { useParams } from "react-router-dom";
import useMeals from "../hooks/useMeals";
import LoadingHandler from "../components/UI/LoadingHandler";
import ErrorHandler from "../components/UI/ErrorHandler";
import CategoryMealsCard from "../components/CategoryMealsCard";
import useCategory from "../hooks/useCategory";
import SectionHeading from "../components/UI/SectionHeading";

export default function CategoryMeals() {
  const { catId } = useParams();

  const { data: meals, loading, error } = useMeals(Number(catId));
  const { data: category } = useCategory(Number(catId));

  if (!meals) return null;

  if (loading) {
    return <LoadingHandler />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="container mt-6 mb-12">
      <SectionHeading
        title={category?.name}
        highlighted="Menu"
        pargraph={category?.description}
      />

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {meals.map((meal) => (
          <CategoryMealsCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
