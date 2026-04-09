import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({

    // API 1 - list of meals (Seafood)
    getMeals: builder.query({
      query: () => "filter.php?c=Seafood",
    }),

    // API 2 - meal details
    getMealById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),

    // Search meals
    searchMeals: builder.query({
      query: (name) => `search.php?s=${name}`,
    }),
  }),
});

export const {
  useGetMealsQuery,
  useGetMealByIdQuery,
  useSearchMealsQuery,
} = recipeApi;