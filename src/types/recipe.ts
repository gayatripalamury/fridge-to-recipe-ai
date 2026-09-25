export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeData {
  title: string;
  prepTime: string;
  baseServings: number;
  ingredients: Ingredient[];
  steps: string[];
  swaps: {
    original: string;
    alternative: string;
  }[];
}