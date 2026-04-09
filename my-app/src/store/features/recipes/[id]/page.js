"use client";

import { useParams } from "next/navigation";
import { useGetMealByIdQuery } from "@/store/features/recipes/recipeApi";

export default function RecipeDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetMealByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;

  const meal = data?.meals?.[0];

  return (
    <div>
      <h1>{meal?.strMeal}</h1>
      <img src={meal?.strMealThumb} width="300" />
      <p>{meal?.strInstructions}</p>
    </div>
  );
}