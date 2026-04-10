import Link from "next/link";

export default function RecipeCard({ meal }) {
  return (
    <Link href={`/recipe/${meal.idMeal}`} className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-3">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
        {meal.strMeal}
      </h3>
      <p className="text-sm text-gray-500 mt-1">Freshly caught & prepared</p>
    </Link>
  );
}