"use client";

import { useState } from "react";
import { useGetMealByIdQuery } from "@/store/features/recipes/recipeApi";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  ExternalLink, 
  Globe, 
  Tag, 
  Utensils, 
  Play,      
  Clock,
  BookOpen,
  Users
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function RecipeDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [servings, setServings] = useState(1);
  const { data, isLoading, isError } = useGetMealByIdQuery(id);

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (isError || !data?.meals) return (
    <div className="p-20 text-center font-medium text-gray-500 text-lg tracking-tight">
      Recipe not found.
    </div>
  );

  const meal = data.meals[0];

  // Helper: Format YouTube URL for Iframe
  const getEmbedUrl = (url) => {
    if (!url) return null;
    return url.replace("watch?v=", "embed/");
  };

  // Logic: Extract and Format Ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim() !== "") {
      ingredients.push({ name, measure });
    }
  }

  const tags = meal.strTags ? meal.strTags.split(",") : [];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 font-sans text-slate-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 hover:text-orange-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            RETURN TO SELECTIONS
          </button>
          
          {meal.strSource && (
            <a 
              href={meal.strSource} 
              target="_blank" 
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors uppercase"
            >
              Original Article <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Sidebar: Visuals & Meta */}
          <div className="lg:col-span-5 space-y-10">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 ring-1 ring-slate-100">
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Ingredients & Scaling Section */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-4 h-4" /> Yield
                </h3>
                <div className="flex bg-slate-50 p-1 rounded-xl">
                  {[1, 2, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setServings(n)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        servings === n ? "bg-white text-orange-600 shadow-sm" : "text-slate-400"
                      }`}
                    >
                      {n}x
                    </button>
                  ))}
                </div>
              </div>

              <ul className="space-y-4">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-baseline border-b border-slate-50 pb-3 last:border-0">
                    <span className="text-slate-700 font-medium">{item.name}</span>
                    <span className="text-slate-400 text-sm font-light italic">
                      {servings > 1 ? `(${servings}x) ` : ""}{item.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Box */}
            {tags.length > 0 && (
              <div className="px-6 flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 shadow-sm uppercase tracking-wider">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Main Content: Instructions & Video */}
          <div className="lg:col-span-7 space-y-16">
            <header className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-orange-100">
                  {meal.strArea} Cuisine
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-slate-200">
                  {meal.strCategory}
                </span>
              </div>
              <h1 className="text-7xl font-serif font-medium text-slate-900 leading-[0.95] -tracking-widest">
                {meal.strMeal}
              </h1>
              <div className="flex items-center gap-8 text-slate-400 text-sm font-medium pt-4">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-400" /> Prep: 45 min</span>
                <span className="flex items-center gap-2"><Utensils className="w-4 h-4 text-orange-400" /> Skill: Intermediate</span>
              </div>
            </header>

            {/* Video Section */}
            {meal.strYoutube && (
              <div className="space-y-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Play className="w-4 h-4 text-red-600 fill-red-600" /> Video Masterclass
                </h3>
                <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-black aspect-video ring-8 ring-white">
                  <iframe 
                    src={getEmbedUrl(meal.strYoutube)} 
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Instructions Section */}
            <section className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <BookOpen className="w-24 h-24" />
               </div>
              <h2 className="text-3xl font-serif font-medium mb-10 text-slate-900">Preparation Method</h2>
              <div className="space-y-8">
                {meal.strInstructions.split('\r\n').filter(p => p.trim()).map((paragraph, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed text-lg font-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}