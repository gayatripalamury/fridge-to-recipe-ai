import React, { useState } from 'react';
import { RecipeData } from '../types/recipe';

export function RecipeView({ recipe }: { recipe: RecipeData }) {
  const [servings, setServings] = useState(recipe.baseServings);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const scaleFactor = servings / recipe.baseServings;

  const toggleStep = (index: number) => {
    setCheckedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
      <p className="text-sm text-gray-500 mb-4">Prep Time: {recipe.prepTime}</p>

      {/* Serving Size Adjuster */}
      <div className="flex items-center gap-4 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <label className="font-medium text-gray-700">Servings:</label>
        <button 
          onClick={() => setServings(Math.max(1, servings - 1))}
          className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 font-bold"
        >
          -
        </button>
        <span className="font-semibold text-lg">{servings}</span>
        <button 
          onClick={() => setServings(servings + 1)}
          className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 font-bold"
        >
          +
        </button>
      </div>

      {/* Scaled Ingredients */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Ingredients</h3>
      <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-1">
        {recipe.ingredients.map((ing, idx) => {
          const scaledAmount = (ing.amount * scaleFactor).toFixed(1).replace(/\.0$/, '');
          return (
            <li key={idx}>
              <span className="font-semibold text-gray-900">{scaledAmount} {ing.unit}</span> of {ing.name}
            </li>
          );
        })}
      </ul>

      {/* Checkable Steps */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Instructions</h3>
      <div className="space-y-2 mb-6">
        {recipe.steps.map((step, idx) => (
          <label 
            key={idx} 
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition border ${
              checkedSteps[idx] ? 'bg-green-50 border-green-200 line-through text-gray-400' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <input 
              type="checkbox" 
              checked={!!checkedSteps[idx]} 
              onChange={() => toggleStep(idx)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span>{step}</span>
          </label>
        ))}
      </div>

      {/* Ingredient Swaps */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Smart Ingredient Swaps</h3>
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-amber-900 space-y-1">
        {recipe.swaps.map((swap, idx) => (
          <p key={idx}>
            🔄 Swap <span className="font-semibold">{swap.original}</span> for <span className="font-semibold">{swap.alternative}</span>
          </p>
        ))}
      </div>
    </div>
  );
}