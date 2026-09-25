import { RecipeData } from '../types/recipe';

export function validateRecipeResult(raw: unknown): RecipeData | null {
  try {
    if (!raw || typeof raw !== 'object') return null;
    const data = raw as Record<string, unknown>;

    if (
      typeof data.title !== 'string' ||
      typeof data.prepTime !== 'string' ||
      typeof data.baseServings !== 'number' ||
      !Array.isArray(data.ingredients) ||
      !Array.isArray(data.steps) ||
      !Array.isArray(data.swaps)
    ) {
      return null;
    }

    for (const ing of data.ingredients) {
      const item = ing as Record<string, unknown>;
      if (typeof item.name !== 'string' || typeof item.amount !== 'number' || typeof item.unit !== 'string') {
        return null;
      }
    }

    return data as unknown as RecipeData;
  } catch {
    return null;
  }
}