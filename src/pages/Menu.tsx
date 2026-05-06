import MenuCard from "../components/MenuCard";
import ErrorHandler from "../components/UI/ErrorHandler";
import LoadingHandler from "../components/UI/LoadingHandler";
import SectionHeading from "../components/UI/SectionHeading";
import useCategories from "../hooks/useCategories";

export default function Menu() {
  const { data: categories, loading, error } = useCategories();

  if (!categories) return null;

  if (loading) {
    return <LoadingHandler />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="container mt-6 mb-12 ">
      <SectionHeading
        title="Our"
        highlighted="Menu"
        pargraph="Browse our categories and find your favorite dishes."
      />
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[320px] gap-4 md:gap-6">
        {categories.map((category, i) => (
          <MenuCard key={category.id} i={i} category={category} />
        ))}
      </div>
    </div>
  );
}
