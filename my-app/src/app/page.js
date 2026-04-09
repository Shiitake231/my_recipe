"use client";

import { useState } from "react";
import { useGetMealsQuery } from "@/store/features/recipes/recipeApi";
import { paginate } from "@/utils/paginate";

export default function Home() {
  const { data, isLoading } = useGetMealsQuery();
  const [page, setPage] = useState(1);

  if (isLoading) return <p>Loading...</p>;

  const meals = data?.meals || [];
  const paginatedMeals = paginate(meals, page, 5);

  return (
    <div>
      {paginatedMeals.map((meal) => (
        <p key={meal.idMeal}>{meal.strMeal}</p>
      ))}

      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}