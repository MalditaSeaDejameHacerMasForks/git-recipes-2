import { Recipe } from "../domain/recipe.ts";
import { RecipeList } from "../domain/recipelist.ts";

const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;
const inpName = document.getElementById(
  "inp-name",
) as HTMLInputElement | null;
const inpCategory = document.getElementById(
  "inp-category",
) as HTMLSelectElement | null;
const inpPrepTime = document.getElementById(
  "inp-prep-time",
) as HTMLInputElement | null;

const mainRecipeList = new RecipeList();

if (btnAdd && inpName && inpCategory && inpPrepTime) {
  btnAdd.addEventListener("click", () => {
    const recipesErrorContainer = document.getElementById("add-recipes-error");
    const recipesError = document.getElementById("add-recipes-error-msg");
    try {
      const newRecipe = new Recipe(inpName.value);
      newRecipe.category = inpCategory.value;
      if (inpPrepTime.value.trim() === "") {
        throw new Error("El tiempo de preparación es obligatorio.");
      }
      newRecipe.prepTime = Number(inpPrepTime.value);
      mainRecipeList.add(newRecipe);
      clearInputs(inpName, inpCategory, inpPrepTime);
      recipesErrorContainer?.classList.add("d-none");
      renderRecipes();
      renderFavorites();
      appendAlert(`${newRecipe.name} agregada correctamente!`, "success");
    } catch (error) {
      recipesErrorContainer?.classList.remove("d-none");
      if (recipesError) {
        if (error instanceof Error) {
          recipesError.innerText = error.message;
        } else {
          recipesError.innerText = String(error);
        }
      }
    }
  });
}

function clearInputs(
  inpNameEl: HTMLInputElement,
  inpCategoryEl: HTMLSelectElement,
  inpPrepTimeEl: HTMLInputElement,
) {
  inpNameEl.value = "";
  inpCategoryEl.selectedIndex = 0;
  inpPrepTimeEl.value = "";
}

function renderRecipes() {
  const recipesList = document.getElementById("recipes-list");
  const recipesContainer = document.getElementById("recipes");
  const emptyList = document.getElementById("empty-list");

  const recipes = mainRecipeList.getRecipes();

  if (recipes.length === 0) {
    emptyList?.classList.remove("d-none");
    recipesContainer?.classList.add("d-none");
    if (recipesList) {
      recipesList.innerHTML = "";
    }
  } else {
    emptyList?.classList.add("d-none");
    recipesContainer?.classList.remove("d-none");
    if (recipesList) {
      recipesList.innerHTML = "";
      recipes.forEach((recipe) => {
        const li = document.createElement("li");
        li.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center",
        );

        const contentSpan = document.createElement("span");
        contentSpan.classList.add("ms-2", "me-auto");
        contentSpan.innerText = recipe.toString();

        const favBtn = document.createElement("button");
        favBtn.type = "button";
        favBtn.classList.add("btn", "btn-sm", "btn-fav");

        if (recipe.isFavorite) {
          favBtn.classList.add("active");
          favBtn.innerHTML = "★ Favorita";
          favBtn.title = "Quitar de favoritas";
        } else {
          favBtn.innerHTML = "☆ Marcar favorita";
          favBtn.title = "Agregar a favoritas";
        }

        favBtn.addEventListener("click", () => {
          recipe.toggleFavorite();
          renderRecipes();
          renderFavorites();
          if (recipe.isFavorite) {
            appendAlert(`"${recipe.name}" agregada a favoritas!`, "success");
          } else {
            appendAlert(`"${recipe.name}" quitada de favoritas.`, "warning");
          }
        });

        li.appendChild(contentSpan);
        li.appendChild(favBtn);
        recipesList.appendChild(li);
      });
    }
  }
}

function renderFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  const favoritesContainer = document.getElementById("favorites");
  const emptyFavoritesList = document.getElementById("empty-favorites-list");
  const favoritesBadge = document.getElementById("favorites-badge");

  const favorites = mainRecipeList.getFavorites();

  if (favoritesBadge) {
    if (favorites.length > 0) {
      favoritesBadge.innerText = String(favorites.length);
      favoritesBadge.classList.remove("d-none");
    } else {
      favoritesBadge.classList.add("d-none");
    }
  }

  if (favorites.length === 0) {
    emptyFavoritesList?.classList.remove("d-none");
    favoritesContainer?.classList.add("d-none");
    if (favoritesList) {
      favoritesList.innerHTML = "";
    }
  } else {
    emptyFavoritesList?.classList.add("d-none");
    favoritesContainer?.classList.remove("d-none");
    if (favoritesList) {
      favoritesList.innerHTML = "";
      favorites.forEach((recipe) => {
        const li = document.createElement("li");
        li.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center",
        );

        const contentSpan = document.createElement("span");
        contentSpan.classList.add("ms-2", "me-auto");
        contentSpan.innerText = recipe.toString();

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn", "btn-sm", "btn-outline-danger");
        removeBtn.innerHTML = "✕ Quitar";
        removeBtn.title = "Quitar de favoritas";

        removeBtn.addEventListener("click", () => {
          recipe.isFavorite = false;
          renderRecipes();
          renderFavorites();
          appendAlert(`"${recipe.name}" quitada de favoritas.`, "warning");
        });

        li.appendChild(contentSpan);
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
      });
    }
  }
}

const alertPlaceholder = document.getElementById("alerts");
const appendAlert = (
  message: string,
  type: "success" | "danger" | "warning" | "info" = "success",
) => {
  if (!alertPlaceholder) return;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible pe-4" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);

  if (type !== "danger") {
    setTimeout(() => {
      const alert = wrapper.querySelector(".alert");
      if (alert) {
        alert.classList.remove("show");
        alert.classList.add("fade");
        setTimeout(() => wrapper.remove(), 150);
      }
    }, 3000);
  }
};

// Initial render
renderRecipes();
renderFavorites();
