import React, { useState } from 'react';
import './index.css';

interface Recipe {
  title: string;
  prepTime: string;
  baseServings: number;
  ingredients: { name: string; amount: number; unit: string }[];
  steps: string[];
  swaps: { original: string; alternative: string }[];
}

export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate recipe');

      setRecipe(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Is your backend server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-stone-800 p-6 rounded-2xl shadow-xl border border-stone-700">
        <h1 className="text-3xl font-bold mb-2 text-amber-400 text-center">🍳 Fridge-to-Recipe AI</h1>
        <p className="text-stone-400 text-center mb-6">Enter the ingredients you have, and let AI cook up a custom recipe!</p>

        <form onSubmit={generateRecipe} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-stone-300">Your Ingredients (comma separated):</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. eggs, cheese, tomato, spinach"
              className="w-full px-4 py-3 rounded-lg bg-stone-900 border border-stone-700 focus:outline-none focus:border-amber-500 text-stone-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 font-semibold text-stone-950 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Chef is cooking...' : 'Generate Recipe'}
          </button>
        </form>

        {error && <div className="mt-4 p-4 bg-red-950 border border-red-800 text-red-200 rounded-lg">{error}</div>}

        {recipe && (
          <div className="mt-8 space-y-6 bg-stone-900 p-6 rounded-xl border border-stone-700">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-amber-300">{recipe.title}</h2>
              <span className="text-sm bg-stone-800 px-3 py-1 rounded-full text-stone-300">⏱ {recipe.prepTime}</span>
            </div>
            
            <p className="text-sm text-stone-400">Servings: {recipe.baseServings}</p>

            <div>
              <h3 className="font-semibold text-amber-400 mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside space-y-1 text-stone-300">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing.amount} {ing.unit} {ing.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-amber-400 mb-2">Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-stone-300">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            {recipe.swaps && recipe.swaps.length > 0 && (
              <div>
                <h3 className="font-semibold text-amber-400 mb-2">Smart Swaps:</h3>
                <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
                  {recipe.swaps.map((swap, i) => (
                    <li key={i}>Replace <span className="text-amber-200 font-medium">{swap.original}</span> with <span className="text-amber-200 font-medium">{swap.alternative}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}