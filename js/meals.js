const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById("meal-container");
    mealsContainer.innerHTML = ``;
    meals.forEach(meal =>{
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add("col");
        mealDiv.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            </div>
        </div>
        `;
        mealsContainer.appendChild(mealDiv);
    })
}

const searchFood = () =>{
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadMeals(searchText);
    searchField.value = "";
}

const loadMealDetail = (idMeal) =>{
    // console.log("get details of id", idMeal);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    // console.log(url);
    
    fetch(url)
    .then(res => res.json())
    .then(data =>  displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal =>{
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = ``;
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("card");
    mealDiv.innerHTML = `
    <div class="row g-0">
        <div class="col-md-5">
        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-7">
        <div class="card-body">
        <h4 class="card-title">${meal.strMeal}</h4>
        <p class="card-text">${meal.strInstructions}</p>
        </div>
        </div>
    </div>
    `;
    detailContainer.appendChild(mealDiv);
}

loadMeals("");