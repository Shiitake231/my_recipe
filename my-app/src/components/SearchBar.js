"use client";
import { useState, useEffect } from "react";
import { useSearchMealsQuery } from "@/store/features/recipes/recipeApi";
import Link from "next/link";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");


  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(term), 500);
    return () => clearTimeout(handler);
  }, [term]);

  const { data, isFetching } = useSearchMealsQuery(debouncedTerm, {
    skip: debouncedTerm.length < 2, // Only search if 2+ characters
  });

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search recipes (e.g. Chicken)..."
        className="w-full px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      
      {/* Loading Spinner */}
      {isFetching && (
        <div className="absolute right-4 top-2.5 animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full" />
      )}

      {/* Results Dropdown */}
      {data?.meals && term.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
          {data.meals.slice(0, 5).map((meal) => (
            <Link 
              key={meal.idMeal} 
              href={`/recipe/${meal.idMeal}`}
              onClick={() => setTerm("")} // Close on click
              className="flex items-center gap-3 p-3 hover:bg-orange-50 transition-colors border-b last:border-0"
            >
              <img src={meal.strMealThumb} className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{meal.strMeal}</p>
                <p className="text-xs text-gray-400">{meal.strCategory}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}