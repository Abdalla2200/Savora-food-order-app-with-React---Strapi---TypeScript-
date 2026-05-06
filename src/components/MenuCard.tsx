import { Link } from "react-router-dom";
import type { Category } from "../types";

export default function MenuCard({
  category,
  i,
}: {
  category: Category;
  i: number;
}) {
  return (
    <div
      className={`group relative rounded-[16px] overflow-hidden ${i === 1 ? "md:col-span-2" : i === 2 ? "md:col-span-2" : i === 4 ? "md:col-span-3" : ""}`}
    >
      <Link to={`/menu/${category.id}`} className="absolute inset-0 z-30" />
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-[1.1] duration-400"
      />
      <div className="bg-black/40 absolute z-10 inset-0"></div>
      <div className="absolute bottom-0 left-0 p-8 z-20">
        <h2 className="text-white font-bold text-xl mb-1 md:text-2xl">
          {category.name}
        </h2>
        <p className="text-white/80 text-sm leading-5">
          {category.description}
        </p>
      </div>
    </div>
  );
}
