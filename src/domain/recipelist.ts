import { Recipe } from "./recipe.ts";

export class RecipeList {
  #recipes: Recipe[] = [];

  add(recipe: Recipe): void {
    const recipeInList = this.#recipes.some(
      (existingRecipe) => existingRecipe.name === recipe.name,
    );
    if (!recipeInList) {
      this.#recipes.push(recipe);
    } else {
      throw new Error(
        `No se pudo agregar. ${recipe.name} ya está en la lista.`,
      );
    }
  }

  getRecipes(): readonly Recipe[] {
    return [...this.#recipes];
  }

  getFavorites(): readonly Recipe[] {
    return this.#recipes.filter((recipe) => recipe.isFavorite);
  }
}
