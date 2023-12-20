// Function to create and append a new div element with an ID
function createDivID(id, text) {
    const div = document.createElement("div");
    div.id = id;
    if (text) {
      div.textContent = text;
    }
    return div;
  }
  
  // Function to create and append a new div element with a class
  function createDivClass(className, text) {
    const div = document.createElement("div");
    div.className = className;
    if (text) {
      div.textContent = text;
    }
    return div;
  }
  
  // Function to print random recipe data
  function printRandomData(data) {
    console.log(data);
    const dayFood = document.getElementById("dayFood");
  
    // Create a div with ID for the food slide
    const foodSlide = createDivID("food-slide");
  
    // Create a div with ID for the image container
    const imageContainer = createDivID("imageContainer");
    const foodImage = document.createElement("img");
    foodImage.src = data.strMealThumb;
    foodImage.alt = "food-img";
    imageContainer.appendChild(foodImage);
  
    // Create a div with ID for the food name
    const foodName = createDivID("food-name", data.strMeal);
  
    foodSlide.appendChild(imageContainer);
    foodSlide.appendChild(foodName);
  
    dayFood.appendChild(foodSlide);
  
    // Add a click event listener to the food slide to display ingredients
    foodSlide.addEventListener("click", () => {
      displayIngredients(data.strMeal);
    });
  }
  
  // Random Recipe
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => printRandomData(res.data.meals[0]))
    .catch((err) => console.log(err));
  
  // Function to print search recipe data
  function printSearchData(data) {
    const imageContainer = document.querySelector("#imageContainer>img");
    const foodName = document.querySelector("#food-name");
    const dayFood = document.querySelector("#dayFood");
    foodName.style.fontSize = "20px";
    imageContainer.style.width = "250px";
    dayFood.style.height = "50%";
    const resultWindow = document.getElementById("results_contents");
    resultWindow.innerHTML = ""; // Clear any existing content
    data.forEach((item) => {
      // Create a div with class for the results
      const resultsDiv = createDivClass("results");
  
      // Create a div with class for the image dock
      const imageDockDiv = createDivClass("imageDock");
      const foodImage = document.createElement("img");
      foodImage.src = item.strMealThumb;
  
      // Create a div with class for the food name
      const foodNameDiv = createDivClass("foodName", item.strMeal);
      imageDockDiv.appendChild(foodImage);
      resultsDiv.appendChild(imageDockDiv);
      resultsDiv.appendChild(foodNameDiv);
      resultWindow.appendChild(resultsDiv);
    });
  }
  
  // Search Recipe
  const searchButton = document.getElementById("search_icons");
  searchButton.addEventListener("click", () => {
    const searchResult = document.getElementById("search_result");
    searchResult.innerHTML = "";
    const searchHeadingDiv = createDivID(
      "search_heading",
      "SAVORY EXPLORATIONS"
    );
    const resultsContentsDiv = createDivID("results_contents");
  
    searchResult.appendChild(searchHeadingDiv);
    searchResult.appendChild(resultsContentsDiv);
    const resultWindow = document.getElementById("results_contents");
    resultWindow.innerHTML = "";
  
    const searchWord = document.getElementById("input_field").value;
    console.log(searchWord);
    document.getElementById("input_field").value = "";
  
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchWord}`)
      .then((res) => {
        console.log(res.data.meals);
        printSearchData(res.data.meals);
        const selectedItem = document.querySelectorAll(".results");
        selectedItem.forEach((item) => {
          item.addEventListener("click", () => {
            displayIngredients(item.querySelector(".foodName").textContent);
          });
        });
      })
      .catch((err) => console.log(err));
  });
  
  function displayIngredients(name) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => {
        var data = response.data.meals[0];
  
        console.log(data);
        const ingredients = document.getElementById("ingredients");
        ingredients.innerHTML = ""; // Clear any existing content
  
        document.getElementById("id01").style.display = "block";
  
        for (let i = 1; i <= 20; i++) {
          const ingredient = data[`strIngredient${i}`];
          const measure = data[`strMeasure${i}`];
  
          if (!ingredient) {
            break;
          }
  
          const ingredientDiv = createDivID("ingredient", ingredient);
          const measureDiv = createDivID("measure", measure);
  
          ingredientDiv.appendChild(measureDiv);
          ingredients.appendChild(ingredientDiv);
        }
      })
      .catch((err) => console.log(err));
  }