const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const recipeListElem = document.getElementById("recipe-list");


function displayRecipes(recipes){
    recipeListElem.innerHTML = "";
    recipes.forEach((recipe) => {

        const recipeItemElem = document.createElement("li");
        recipeItemElem.classList.add("recipe-item");

        recipeImageElem = document.createElement("img");
        recipeImageElem.src = recipe.image;
        recipeImageElem.alt = "recipe img";

        recipeTitleElem = document.createElement("h2");
        recipeTitleElem.innerText = recipe.title;

        recipeIngredElem = document.createElement("p");
        recipeIngredElem.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(",")}`;

        recipeLinkElem = document.createElement("div");
        recipeLinkElem.classList.add("link");

        recipeAnchorElem = document.createElement("a");
        recipeAnchorElem.href = recipe.sourceUrl;
        recipeAnchorElem.target = "_blank";
        recipeAnchorElem.innerText = "View Recipe";
        
        // store link inside div
        recipeLinkElem.appendChild(recipeAnchorElem); 

        // store elements in recipeContainer
        recipeItemElem.appendChild(recipeImageElem);
        recipeItemElem.appendChild(recipeTitleElem);
        recipeItemElem.appendChild(recipeIngredElem);
        recipeItemElem.appendChild(recipeLinkElem);
        // recipeItemElem.appendChild(recipeAnchorElem);

        // store recipe item inside main recipe list
        recipeListElem.appendChild(recipeItemElem);
    });
}



async function getRecipes(){
    const res = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);

    const data = await res.json();
    console.log(data.recipes)
    return data.recipes;
}


async function init(){
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();