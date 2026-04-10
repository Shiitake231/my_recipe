"use client";

import { useState } from "react";
import { useGetMealsQuery } from "@/store/features/recipes/recipeApi";
import { paginate } from "@/utils/paginate";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";

export default function Home() {
  const { data, isLoading } = useGetMealsQuery();
  const [page, setPage] = useState(1);
  const pageSize = 8;

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const meals = data?.meals || [];
  const paginatedMeals = paginate(meals, page, pageSize);
  const totalPages = Math.ceil(meals.length / pageSize);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Seafood Selection</h1>
          <p className="text-gray-500 mt-2">Explore {meals.length} world-class recipes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {paginatedMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>

        <Pagination 
          page={page} 
          totalPages={totalPages} 
          setPage={setPage} 
        />
      </main>
    </div>
  );
}