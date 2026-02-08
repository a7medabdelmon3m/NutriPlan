// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/

export default class components {
  constructor() {
    this.catContainer = document.querySelector("#categories-grid");
    this.recipesCount = document.querySelector(
      "#recipes-count span:first-child",
    );
    this.recipesSearch = document.querySelector(
      "#recipes-count span:last-child",
    );
    this.Loading = document.querySelector("#app-loading-overlay");
    this.mealDetails = document.querySelector("#meal-details");
    this.headerDesc = document.querySelector("#header-desc");
    this.headerTitle = document.querySelector("#header-title");
    this.recipesContainer = document.querySelector("#recipes-grid");
    this.productsGrid = document.querySelector("#products-grid");
    this.foodlogTodaySection = document.querySelector("#foodlog-today-section");
    this.weeklyChart = document.querySelector("#weekly-chart");
    this.searcHresult = document.querySelector("#search-result");
    this.productDetailsParent = document.querySelector(
      ".product-details-container-parent",
    );
    this.productDetailsContainer = document.querySelector(
      "#product-details-container",
    );
    this.parentOfLogCard = document.querySelector("#parent-ofLog-card");
    this.foodlogDate = document.querySelector("#foodlog-date");

    this.headersAndDesc = {
      recipes: {
        header: "Meals & Recipes",
        desc: "Discover delicious and nutritious recipes tailored for you",
      },
      meals: {
        header: "Recipe Details",
        desc: "View full recipe information and nutrition facts",
      },
      scanner: {
        header: "Product Scanner",
        desc: "Search packaged foods by name or barcode",
      },
      log: {
        header: "Food Log",
        desc: "Track your daily nutrition and food intake",
      },
    };
    this.grade = {
      A: "Excellent",
      B: "good",
      C: "average",
      D: "poor",
      E: "bad",
      UNKNOWN: "unknown",
    };
    this.novaGroups = {
      1: "Unprocessed",
      2: "Processed Ingredients",
      3: "Processed",
      4: "Ultra-processed",
    };
    this.nuttritionColors = {
      a: "#00C950",
      b: "#7CCF00",
      c: "#F0B100",
      d: "#FF6900",
      e: "#FB2C36",
      unknown: "#99A1AF",
    };
  }

  setHeader(pageBtn) {
    let dataHeader = pageBtn.getAttribute("data-header");
    let value = this.headersAndDesc[dataHeader];
    this.headerDesc.innerHTML = value.desc;
    this.headerTitle.innerHTML = value.header;
  }

  showLoading() {
    this.Loading.style.display = "block";
  }
  hideLoading() {
    this.Loading.style.display = "none";
  }

  showSpinner(place) {
    place.innerHTML = `
            <div class="spinner flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
    `;
  }
  showEmptyState() {
    this.productsGrid.innerHTML = `
        <div
                id="products-empty"
                class="col-span-full w-full min-h-[450px] flex items-center justify-center"
              >
                <div class="text-center">
                  <div
                    class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <i class="fas fa-box-open text-3xl text-gray-400"></i>
                  </div>

                  <p class="text-gray-500 text-lg mb-2">
                    No products to display
                  </p>
                  <p class="text-gray-400 text-sm">
                    Search for a product or browse by category
                  </p>
                </div>
              </div>
    `;
  }

  transferBetweenPages(currentPage, nextPage) {
    currentPage.classList.add("hidden");
    nextPage.classList.remove("hidden");
  }
  transferBetweenNavLinks(currentLink, nextLink) {
    this.setHeader(nextLink);
    currentLink.classList.remove("bg-emerald-50", "text-emerald-700");
    currentLink.classList.add("text-gray-600", "hover:bg-gray-50");

    nextLink.classList.remove("text-gray-600", "hover:bg-gray-50");
    nextLink.classList.add("bg-emerald-50", "text-emerald-700");
  }

  displayCategories(categories) {
    this.catContainer.innerHTML = categories
      .map((cat) => {
        return `
                <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${cat.name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${cat.name}</h3>
                </div>
              </div>
            </div>
            `;
      })
      .join("");
  }

  displayRecipes(recipes) {
    console.log("hello from displayrecips");
    if (!recipes) {
      this.recipesContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found</p>
            <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
           </div>`;
    }
    this.recipesCount.innerHTML = `Showing ${recipes.length} recipes`;
    this.recipesContainer.innerHTML = recipes
      .map((recipe) => {
        return `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${recipe.id}"
              data-header = "meals"
              
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${recipe.thumbnail}"
                  alt="${recipe.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${recipe.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${recipe.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${recipe.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            "instructions":
                  ${recipe.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${recipe.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${recipe.area}
                  </span>
                </div>
              </div>
            </div>`;
      })
      .join("");
  }
  displayMealDetails(meal, nutritions) {
    let embedUrl = "";
    if (meal.youtube) {
      embedUrl = meal.youtube.replace("watch?v=", "embed/");
    }

    this.mealDetails.innerHTML = `
        <div class="max-w-7xl mx-auto">
              <!-- Back Button -->
              <button
                id="back-to-meals-btn"
                class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
              >
                <i class="fa-solid fa-arrow-left"></i>
                <span>Back to Recipes</span>
              </button>

              <!-- Hero Section -->
              <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div class="relative h-80 md:h-96">
                  <img
                    src="${meal.thumbnail}"
                    alt="${meal.name}"
                    class="w-full h-full object-cover"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  ></div>
                  <div class="absolute bottom-0 left-0 right-0 p-8">
                    <div class="flex items-center gap-3 mb-3">
                      <span
                        class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                        >${meal.category}</span
                      >
                      <span
                        class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                        >${meal.area}</span
                      >
                      ${meal.tags
                        .map((tag) => {
                          return `
                                <span
                                class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                                >${tag}</span
                            `;
                        })
                        .join()}
                      >
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                      ${meal.name}
                    </h1>
                    <div class="flex items-center gap-6 text-white/90">
                      <span class="flex items-center gap-2">
                        <i class="fa-solid fa-clock"></i>
                        <span>30 min</span>
                      </span>
                      <span class="flex items-center gap-2">
                        <i class="fa-solid fa-utensils"></i>
                        <span id="hero-servings">${nutritions.servings} servings</span>
                      </span>
                      <span class="flex items-center gap-2">
                        <i class="fa-solid fa-fire"></i>
                        <span id="hero-calories">${nutritions.perServing.calories} cal/serving</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3 mb-8">
                <button
                  id="log-meal-btn"
                  class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                  data-meal-id="52772"
                >
                  <i class="fa-solid fa-clipboard-list"></i>
                  <span>Log This Meal</span>
                </button>
              </div>

              <!-- Main Content Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column - Ingredients & Instructions -->
                <div class="lg:col-span-2 space-y-8">
                  <!-- Ingredients -->
                  <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2
                      class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                    >
                      <i class="fa-solid fa-list-check text-emerald-600"></i>
                      Ingredients
                      <span class="text-sm font-normal text-gray-500 ml-auto"
                        >9 items</span
                      >
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      ${meal.ingredients
                        .map((ing) => {
                          return `
                                <div
                                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                                     >
                                    <input
                                    type="checkbox"
                                    class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                                    />
                                    <span class="text-gray-700">
                                    <span class="font-medium text-gray-900">${ing.measure}</span>
                                    ${ing.ingredient}
                                    </span>
                                </div>
                              
                            `;
                        })
                        .join("")}
                        
                    </div>
                  </div>

                  <!-- Instructions -->
                  <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2
                      class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                    >
                      <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                      Instructions
                    </h2>
                    <div class="space-y-4">



                      
                      ${meal.instructions
                        .map((ins, idx) => {
                          return `
                        <div
                            class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                            <div
                            class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                            >
                            ${idx + 1}
                            </div>
                            <p class="text-gray-700 leading-relaxed pt-2">
                            ${ins}
                            </p>
                      </div>
                              
                            `;
                        })
                        .join("")}
                    </div>
                  </div>

                  <!-- Video Section -->
                  <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h2
                      class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                    >
                      <i class="fa-solid fa-video text-red-500"></i>
                      Video Tutorial
                    </h2>
                    <div
                      class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                    >
                      <iframe
                        src="${embedUrl}"
                        class="absolute inset-0 w-full h-full"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      >
                      </iframe>
                    </div>
                  </div>
                </div>

                <!-- Right Column - Nutrition -->
                <div class="space-y-6">
                  <!-- Nutrition Facts -->
                  <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                    <h2
                      class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                    >
                      <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                      Nutrition Facts
                    </h2>
                    <div id="nutrition-facts-container">
                      <p class="text-sm text-gray-500 mb-4">Per serving</p>

                      <div
                        class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                      >
                        <p class="text-sm text-gray-600">Calories per serving</p>
                        <p class="text-4xl font-bold text-emerald-600">${nutritions.perServing.calories}</p>
                        <p class="text-xs text-gray-500 mt-1">Total: ${nutritions.totals.calories} cal</p>
                      </div>

                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span class="text-gray-700">Protein</span>
                          </div>
                          <span class="font-bold text-gray-900">${nutritions.perServing.protein}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                          <div
                            class="bg-emerald-500 h-2 rounded-full"
                            style="width: ${(nutritions.perServing.protein * 100) / nutritions.totals.protein}%"
                          ></div>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span class="text-gray-700">Carbs</span>
                          </div>
                          <span class="font-bold text-gray-900">${nutritions.perServing.carbs}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                          <div
                            class="bg-blue-500 h-2 rounded-full"
                            style="width:${(nutritions.perServing.carbs * 100) / nutritions.totals.carbs}%"
                          ></div>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                            <span class="text-gray-700">Fat</span>
                          </div>
                          <span class="font-bold text-gray-900">${nutritions.perServing.fat}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                          <div
                            class="bg-purple-500 h-2 rounded-full"
                            style="width: ${(nutritions.perServing.fat * 100) / nutritions.totals.fat}%"
                          ></div>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                            <span class="text-gray-700">Fiber</span>
                          </div>
                          <span class="font-bold text-gray-900">${nutritions.perServing.fiber}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                          <div
                            class="bg-orange-500 h-2 rounded-full"
                            style="width:${(nutritions.perServing.fiber * 100) / nutritions.totals.fiber}%"
                          ></div>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                            <span class="text-gray-700">Sugar</span>
                          </div>
                          <span class="font-bold text-gray-900">${nutritions.perServing.sugar}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                          <div
                            class="bg-pink-500 h-2 rounded-full"
                            style="width: ${(nutritions.perServing.sugar * 100) / nutritions.totals.sugar}%"
                          ></div>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <span class="text-gray-700">Saturated Fat</span>
                          </div>
                          <span class="font-bold text-gray-900">${nutritions.perServing.saturatedFat}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                          <div
                            class="bg-red-500 h-2 rounded-full"
                            style="width:${(nutritions.perServing.saturatedFat * 100) / nutritions.totals.saturatedFat}%"
                          ></div>
                        </div>
                      </div>

                      <div class="mt-6 pt-6 border-t border-gray-100">
                        <h3 class="text-sm font-semibold text-gray-900 mb-3">
                          Other
                        </h3>
                        <div class="grid grid-cols-2 gap-3 text-sm">
                          <div class="flex justify-between">
                            <span class="text-gray-600">Cholesterol</span>
                            <span class="font-medium">${nutritions.perServing.cholesterol}mg</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-gray-600">Sodium</span>
                            <span class="font-medium">${nutritions.perServing.sodium}mg</span>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
  }
  showSeachedValue(value) {
    if (value) {
      this.recipesSearch.innerHTML = `
        for "${value}"
    `;
    } else {
      this.recipesSearch.innerHTML = "";
    }
  }
  displaySearchedProduct(products) {
    this.productsGrid.innerHTML = products
      .map((product) => {
        return `
                <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                    style ="background-color:${this.nuttritionColors[product.nutritionGrade]}"
                  >
                    Nutri-Score ${product.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="${product.novaGroup ? "" : "hidden"} absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${product.novaGroup}"
                  >
                    ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                   ${product.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${product.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>100g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
      })
      .join("");
  }

  displayProductDetails(product) {
    this.productDetailsParent.classList.remove("hidden");
    this.productDetailsContainer.innerHTML = `
          <div class="p-6 max-w-lg  mx-4 bg-white rounded-2xl shadow-sm border border-gray-100 relative">
    <div class="flex items-start gap-6 mb-6">
        <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain"/>
        </div>
        <div class="flex-1">
            <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand}</p>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
            <p class="text-sm text-gray-500 mb-3">1</p>
            
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #85BB2F20">
                    <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: #85BB2F">
                        ${product.nutritionGrade.toUpperCase()}
                    </span>
                    <div>
                        <p class="text-xs font-bold" style="color: #85BB2F">Nutri-Score</p>
                        <p class="text-[10px] text-gray-600">${this.grade[product.nutritionGrade.toUpperCase()]}</p>
                    </div>
                </div>
                
                <div class=" ${this.novaGroups[product.novaGroup] ? "" : "hidden"} flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #00AA1F20">
                    <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: #00AA1F">
                        ${product.novaGroup}
                    </span>
                    <div>
                        <p class="text-xs font-bold" style="color: #00AA1F">NOVA</p>
                        <p class="text-[10px] text-gray-600">${this.novaGroups[product.novaGroup]} foods</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="close-product-modal text-gray-400 hover:text-gray-600">
            <i class="fa-solid fa-times text-2xl"></i>
        </button>
    </div>
    
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
        <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-emerald-600"></i>
            Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
        </h3>
        
        <div class="text-center mb-4 pb-4 border-b border-emerald-200">
            <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories}</p>
            <p class="text-sm text-gray-500">Calories</p>
        </div>
        
        <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${product.nutrients.protein}%"></div>
                </div>
                <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein}g</p>
                <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width:${product.nutrients.carbs}%"></div>
                </div>
                <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs}g</p>
                <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${product.nutrients.fat}%"></div>
                </div>
                <p class="text-lg font-bold text-purple-600">${product.nutrients.fat}g</p>
                <p class="text-xs text-gray-500">Fat</p>
            </div>
            <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${product.nutrients.sugar}%"></div>
                </div>
                <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar}g</p>
                <p class="text-xs text-gray-500">Sugar</p>
            </div>
        </div>
        
        <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
            <div class="text-center">
                <p class="text-sm font-semibold text-gray-900">${product.nutrients.fat}%</g</p>
                <p class="text-xs text-gray-500">Saturated Fat</p>
            </div>
            <div class="text-center">
                <p class="text-sm font-semibold text-gray-900">${product.nutrients.fiber}%</g</p>
                <p class="text-xs text-gray-500">Fiber</p>
            </div>
            <div class="text-center">
                <p class="text-sm font-semibold text-gray-900">${product.nutrients.sodium}%</g</p>
                <p class="text-xs text-gray-500">Sodium</p>
            </div>
        </div>
    </div>
    
    <div class="flex gap-3">
        <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="6111252421582">
            <i class="fa-solid fa-plus mr-2"></i>Log This Food
        </button>
        <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Close
        </button>
    </div>
</div>
    `;
  }

  closeModal(target) {
    const isCloseBtn = target.closest(".close-product-modal");
    if (target === this.productDetailsContainer || isCloseBtn) {
      this.productDetailsParent.classList.add("hidden");
    }
  }
  activeNutriScore(currentBtn, nextBtn) {
    if (currentBtn) currentBtn.classList.remove("ring-2", "ring-gray-900");

    nextBtn.classList.add("ring-2", "ring-gray-900");
    currentBtn = nextBtn;
    return currentBtn;
  }
  showLogCard(meal, nutritions) {
    console.log("hello from log card");
    this.parentOfLogCard.classList.remove("hidden");
    this.parentOfLogCard.innerHTML = `     
  <!-- Margin -->
  <div class="mx-4 my-0 w-[1000px]">
    <!-- Card -->
    <div
      class="w-[400px] h-[415.175px] p-6 bg-white rounded-2xl shadow-lg flex flex-col"
    >

      <!-- Header -->
      <div class="flex items-center gap-3 mb-4">
        <img
          src="${meal.thumbnail}"
          alt="${meal.name}"
          class="w-14 h-14 rounded-xl object-cover"
        />
        <div>
          <h2 class="text-base font-semibold text-gray-900">
            Log This Meal
          </h2>
          <p class="text-sm text-gray-500">${meal.name}</p>
        </div>
      </div>

      <!-- Servings -->
      <div class="mb-4">
        <p class="text-sm font-medium text-gray-700 mb-2">
          Number of Servings
        </p>

        <div class="flex items-center gap-3">
          <button
            class="dec-counter w-10 h-10 bg-gray-100 rounded-lg text-lg font-semibold"
          >
            -
          </button>

          <div
            class="counter-value w-14 h-10 border rounded-lg flex items-center justify-center font-medium"
          >
            1
          </div>

          <button
            class="inc-counter w-10 h-10 bg-gray-100 rounded-lg text-lg font-semibold"
          >
            +
          </button>
        </div>
      </div>

      <!-- Nutrition Box -->
      <div class="bg-emerald-50 rounded-xl p-4 mb-6">
        <p class="text-sm text-gray-600 mb-3">
          Estimated nutrition per serving:
        </p>

        <div class="grid grid-cols-3 gap-y-3 text-center">
          <div>
            <p class="text-green-600 font-bold text-lg">${nutritions.perServing.calories}</p>
            <p class="text-xs text-gray-500">Calories</p>
          </div>

          <div>
            <p class="text-blue-600 font-bold text-lg">${nutritions.perServing.protein}g</p>
            <p class="text-xs text-gray-500">Protein</p>
          </div>

          <div>
            <p class="text-orange-500 font-bold text-lg">${nutritions.perServing.carbs}g</p>
            <p class="text-xs text-gray-500">Carbs</p>
          </div>

          <div class="col-span-3">
            <p class="text-purple-600 font-bold text-lg">${nutritions.perServing.fat}g</p>
            <p class="text-xs text-gray-500">Fat</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-auto flex gap-3">
        <button
        id ="cansel-log"
          class="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
        >
          Cancel
        </button>

        <button
        id = "log-card-btn"
          class="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium"
        >
          Log Meal
        </button>
      </div>
    </div>
  </div>
    
    `;
  }
  showFoodLogDate() {
    let date = new Date();
    const options = { weekday: "long", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    this.foodlogDate.innerHTML = formattedDate;
  }
  showLogAlert(mealDatails, numOfserving) {
    const cals = mealDatails.perServing.calories;
    Swal.fire({
      title: "Meal logged!",

      html: `<p>${mealDatails.recipeName} (${numOfserving} sering) has been added to your daily log. </p>
      ${cals > 0 ? `<p class="text-emerald-600 font-semibold mt-2">+${cals} calories</p>` : ""}
      `,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  showFoodLog(log, totalNutri) {
    this.foodlogTodaySection.innerHTML = `<div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              <!-- Calories Progress -->
              <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Calories</span
                  >
                  <span class="text-sm text-gray-500">${totalNutri.cal} / 2000 kcal</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ">
                  <div
                    class="bg-emerald-500 h-2.5 rounded-full"
                    style="width: ${(totalNutri.cal * 100) / 2000}%"
                  ></div>
                </div>
              </div>
              <!-- Protein Progress -->
              <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700"
                    >Protein</span
                  >
                  <span class="text-sm text-gray-500">${totalNutri.pro} / 50 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ">
                  <div
                    class="bg-blue-500 h-2.5 rounded-full"
                    style="width: ${(totalNutri.pro * 100) / 50}%"
                  ></div>
                </div>
              </div>
              <!-- Carbs Progress -->
              <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Carbs</span>
                  <span class="text-sm text-gray-500">${totalNutri.carbs}/ 250 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ">
                  <div
                    class="bg-amber-500 h-2.5 rounded-full"
                    style="width: ${( totalNutri.carbs * 100 ) / 250}%"
                  ></div>
                </div>
              </div>
              <!-- Fat Progress -->
              <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Fat</span>
                  <span class="text-sm text-gray-500">${totalNutri.fat} / 65 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ">
                  <div
                    class="bg-purple-500 h-2.5 rounded-full"
                    style="width: ${(totalNutri.carbs * 100) / 65}%"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Logged Items -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (${log.length})
                </h4>
                ${
                  log.length === 0 ?
                  "" :
                  `
                    <button
                  id="clear-foodlog"
                  class="text-red-500 hover:text-red-600 text-sm font-medium"
                  
                >
                  <i class="fa-solid fa-trash mr-1"></i>Clear All
                </button>
                  `
                }
               
                  
                 
                
              </div>

              <div id="logged-items-list" class="space-y-2">
                <!-- Empty State -->
                ${
                  log.length !== 0 
                    ? log
                        .map((l , idx) => {
                          return `
                        <div
                        id ="log-item"
                        class="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all group" idx-data = "${idx}" >
                        <div class="flex items-center gap-4">
                            <div class="relative">
                              <div class="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 overflow-hidden">
                                  <img src="${l.imgSrc}" alt="${l.name}" class="w-full h-full object-cover">
                              </div>
                          </div>

                            <div>
                                <h4 class="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">${l.name}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                       ${l.numOfservingOrBrand } ${l.type === 'recipe'?'serving':''} 
                                    </span>
                                    
                                    <span class="text-gray-300">•</span>
                                    <span class="-top-2 -left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-600">
                                    ${l.type}
                                    </span>
                                    
                                </div>
                                <span class="text-xs text-gray-400 flex items-center gap-1">
                                        <i class="fa-regular fa-clock"></i> ${l.addedAt}
                                    </span>

                            </div>
                        </div>

                        <div class="flex items-center gap-6">
                            <div class="text-right">
                                <p class="text-xl font-black text-gray-900">${l.type === 'recipe' ? Math.round(l.nutritions.calories*l.numOfservingOrBrand) :l.nutritions.calories }</p>
                                <p class="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">kcal</p>
                            </div>
                                <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                    <span class="px-2 py-1 bg-amber-50 rounded">${ l.type === 'recipe' ? Math.round(l.nutritions.protein*l.numOfservingOrBrand) :l.nutritions.protein }1g C</span>
                                    <span class="px-2 py-1 bg-purple-50 rounded">${ l.type === 'recipe' ? Math.round(l.nutritions.carbs*l.numOfservingOrBrand) :l.nutritions.carbs}g F</span>
                                    <span class="px-2 py-1 bg-blue-50 rounded">${ l.type === 'recipe' ? Math.round(l.nutritions.fat*l.numOfservingOrBrand) :l.nutritions.fat}g P</span>
                                </div>

                            <button
                            id ="delete-btn"
                            class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    `;
                        })
                        .join("")
                    : `<div class="text-center py-8 text-gray-500">
                            <i
                            class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                            ></i>
                            <p class="font-medium">No meals logged today</p>
                            <p class="text-sm">
                                Add meals from the Meals page or scan products
                            </p>
                      </div>`
                }
                
              </div>
            </div>`
  }
  showWeekCals(week){
   this.weeklyChart.innerHTML =  `
            ${week.map(day=> `
              <div class="text-center ${day.date === new Date().getDate() ?'bg-indigo-100 rounded-xl':''}">
                  <p class="text-xs text-gray-500 mb-1">${day.day}</p>
                  <p class="text-sm font-medium text-gray-900">${day.date}</p>
                  <div class="mt-2 ${day.cals !== 0 ?'text-emerald-600':'text-gray-300'}">
                    <p class="text-lg font-bold">${day.cals}</p>
                    <p class="text-xs">kcal</p>
                    <p class="${day.items === 0 ? 'hidden' :''} text-xs text-gray-400 mt-1">${day.items} items</p>
                  </div>
                </div>`).join('')}
                
    `
  }
        showSearchResult(items, word) {
        this.searcHresult.innerHTML = `
            ${(!items.results || items.${word? :}.length === 0) 
                ? `<p>No products found for "${word}"</p>` 
                : `<p>Found ${items.pagination.total} products for "${word}"</p>`
            }
        `;
    }
}
