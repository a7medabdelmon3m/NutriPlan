/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import MealsApi from "./api/mealdb.js";
import appState from "./state/appState.js";
import components from "./ui/components.js";

class App {
  constructor() {
    this.mealAPI = new MealsApi();
    this.compUi = new components();
    this.appS = new appState();
    this.areaBtns = document.querySelectorAll(".area-btns button");
    this.navLinks = document.querySelectorAll("nav a");
    this.pages = document.querySelectorAll(".page");
    this.productCategoryBtns = document.querySelectorAll(
      ".product-category-btn",
    );
    this.nutriScoreFilterBtns = document.querySelectorAll(
      ".nutri-score-filter",
    );
    this.mealDeailsPage = document.querySelector("#meal-details");
    this.searchInput = document.querySelector("#search-input");
    this.productSearchInput = document.querySelector("#product-search-input");
    this.searchProductBtn = document.querySelector("#search-product-btn");
    this.recipesContainer = document.querySelector("#recipes-grid");
    this.productsGrid = document.querySelector("#products-grid");
    this.lookupBarcodeBtn = document.querySelector("#lookup-barcode-btn");
    this.headerMenuBtn = document.querySelector("#header-menu-btn");
    // this.logCardBtn = document.querySelector("#log-card-btn");
    this.barcodeRejex = /^\d{13}$/;

    this.currentPage;
  }

  async init() {
    // ========== this part for testing the code==========
    // // ===================================================
    // document.addEventListener('click' , async (e)=>{
    //     e.preventDefault() ;
    //    const data = await this.mealAPI.getMealById('53281') ;
    //    const ans = await this.mealAPI.getNutritionFacts(data) ;
    //    this.appS.archiveDay() ;
    //     let today = this.appS.getLastWeek() ;

    //      console.log(today)

    // })
    // this.pages[0].classList.add('hidden')
    // this.pages[1].classList.remove('hidden')
    // ===================================================
    // ===================================================
    this.compUi.showLoading();
    try {
      const cats = await this.mealAPI.getAllCategories();
      // console.log(cats)
      this.compUi.displayCategories(cats);
      this.catCards = document.querySelectorAll(".category-card");

      const recipes = await this.mealAPI.getRandomMeals();
      //  console.log(recipes)
      this.compUi.displayRecipes(recipes);
    } catch (error) {
      console.error("Initialization failed", error);
    } finally {
      this.compUi.hideLoading();
    }

    this.addEventListeners();
    this.compUi.showEmptyState();
    this.compUi.showFoodLogDate();
    this.renderLogfoods();
    this.renderWeekCals();
  }

  addEventListeners() {
    this.headerMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector("#sidebar").classList.add("open");
      document.querySelector("#sidebar-overlay").classList.add("active");
    });
    document.addEventListener("click", (e) => {
      let sideCloseBtn = e.target.closest("#sidebar-close-btn");
      let navLinks = e.target.closest(".nav-link");
      let sidebarOverlay = document.querySelector("#sidebar-overlay");

      if (sideCloseBtn || navLinks || e.target === sidebarOverlay) {
        document.querySelector("#sidebar").classList.remove("open");
        document.querySelector("#sidebar-overlay").classList.remove("active");
      }
    });
    // ================= the meal page ====================
    // ====================================================
    this.searchInput.addEventListener("input", async (e) => {
      e.preventDefault();
      let term = this.searchInput.value;
      const data = await this.mealAPI.searchMeal(term);
      if (!data) return;
      this.compUi.showSpinner(this.recipesContainer);
      this.compUi.displayRecipes(data);
      this.compUi.showSeachedValue(term);
    });

    let currentAreaBtn = this.areaBtns[0];
    this.areaBtns.forEach((areaBtn) => {
      areaBtn.addEventListener("click", async () => {
        // console.log(this.areaBtns)
        if (currentAreaBtn === areaBtn) return;

        if (currentAreaBtn) {
          currentAreaBtn.classList.remove("bg-emerald-600", "text-white");
          currentAreaBtn.classList.add("bg-gray-100", "text-gray-700");
        }

        areaBtn.classList.add("bg-emerald-600", "text-white");
        areaBtn.classList.remove("bg-gray-100", "text-gray-700");

        currentAreaBtn = areaBtn;
        this.compUi.showSpinner(this.recipesContainer);
        try {
          const area = areaBtn.getAttribute("data-area");
          let filteredDataByArea;
          if (area === "all") {
            filteredDataByArea = await this.mealAPI.getRandomMeals();
            this.compUi.displayRecipes(filteredDataByArea);
          } else {
            filteredDataByArea = await this.mealAPI.filterMaelByArea(area);
            this.compUi.displayRecipes(filteredDataByArea);
          }

          // console.log(filteredDataByArea ,areaBtn.getAttribute('data-area') ) ;
        } catch (error) {
          console.error("Failed to filter", error);
        }
      });
    });

    //=============== category cards ================
    if (this.catCards) {
      this.catCards.forEach((catCard) => {
        catCard.addEventListener("click", async () => {
          this.compUi.showSpinner(this.recipesContainer);
          try {
            const filteredByCategory = await this.mealAPI.filterMaelByCategoriy(
              catCard.getAttribute("data-category"),
            );
            this.compUi.displayRecipes(filteredByCategory);

            // console.log(filteredByCategory ,catCard.getAttribute('data-category') ) ;
          } catch (error) {
            console.error("Failed to filter", error);
          }
        });
      });
    }

    //================ move between pages ===================
    this.currentNavLink = this.navLinks[0];
    this.currentPage = this.pages[0];
    this.navLinks.forEach((link, idx) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.compUi.transferBetweenNavLinks(this.currentNavLink, link);
        //   console.log(link ,  idx)
        this.currentNavLink = link;

        this.compUi.transferBetweenPages(this.currentPage, this.pages[idx]);
        this.currentPage = this.pages[idx];
      });
    });
    // =============== show meal details =================

    document.addEventListener("click", async (e) => {
      const card = e.target.closest(".recipe-card");
      if (!card) return;

      const id = card.getAttribute("data-meal-id");
      this.data = await this.mealAPI.getMealById(id);
      this.nutri = await this.mealAPI.getNutritionFacts(this.data);
      console.log(this.nutri);
      this.compUi.displayMealDetails(this.data, this.nutri);
      this.compUi.transferBetweenPages(this.currentPage, this.mealDeailsPage);
      this.currentPage = this.mealDeailsPage;
      this.compUi.setHeader(card);

      const backBtn = document.querySelector("#back-to-meals-btn");
      if (backBtn) {
        backBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.compUi.transferBetweenPages(this.currentPage, this.pages[0]);
          this.currentPage = this.pages[0];
          this.compUi.setHeader(this.currentNavLink);
          console.log(this.currentPage);
        });
      }
    });

    document.addEventListener("click", async (e) => {
      const logBtn = e.target.closest("#log-meal-btn");
      if (logBtn) {
        console.log("hi");
        e.preventDefault();

        if (this.data && this.nutri) {
          this.compUi.showLogCard(this.data, this.nutri);
          document
            .querySelector("#Log-card-overlay")
            .classList.remove("hidden");
        }
        return;
      }

      const plusBtn = e.target.closest(".inc-counter");
      const minusBtn = e.target.closest(".dec-counter");
      const counterValue = document.querySelector(".counter-value");
      if (plusBtn || minusBtn) {
        let currentValue = parseFloat(counterValue.innerText);
        if (plusBtn && currentValue < 10) {
          currentValue += 0.5;
        }
        if (minusBtn && currentValue >= 1) {
          currentValue -= 0.5;
        }
        counterValue.innerText = currentValue;
      }
    });
    document.addEventListener("click", async (e) => {
      const canselLog = e.target.closest("#cansel-log");
      const addLog = e.target.closest("#log-card-btn");
      const logCardOverlay = document.querySelector("#Log-card-overlay");
      const logCard = document.querySelector("#parent-ofLog-card");

      if (
        canselLog ||
        e.target === logCardOverlay ||
        e.target.id === "parent-ofLog-card"
      ) {
        if (logCard) logCard.classList.add("hidden");
        if (logCardOverlay) logCardOverlay.classList.add("hidden");
        return;
      }
      if (addLog) {
        const counterValue = parseFloat(
          document.querySelector(".counter-value").innerText,
        );
        if (this.data && this.nutri) {
          if (logCard) logCard.classList.add("hidden");
          if (logCardOverlay) logCardOverlay.classList.add("hidden");
          // console.log(this.data)
          this.compUi.showLogAlert(this.nutri, counterValue);
          this.appS.addFoodOrProduct(
            this.nutri.recipeName,
            "recipe",
            this.nutri.perServing,
            this.data.id,
            this.data.thumbnail,
            counterValue,
          );
          this.appS.saveLogInLocalStorage();
          const n = this.appS.calcTotalNutritons();
          this.compUi.showFoodLog(this.appS.logs, n);
          this.renderWeekCals();
          return;
        }
      }
    });
    document.addEventListener("click", async (e) => {
      e.preventDefault();
      const deleteBtn = e.target.closest("#delete-btn");
      const clearFoodlog = e.target.closest("#clear-foodlog");
      const logItem = e.target.closest("#log-item");

      if (deleteBtn && logItem) {
        const idx = logItem.getAttribute("idx-data");
        this.appS.deleteLogItem(idx);
        this.renderLogfoods();
        this.renderWeekCals();
        // console.log(idx)
        return;
      }
      if (clearFoodlog) {
        // localStorage.removeItem('foods') ;
        
        Swal.fire({
          title: "Clear Today's Log?",
          text: "This will remove all logged food items for today!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#5f5f5f",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your foods has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer:1500

            });
                this.appS.logs = [];
                this.appS.saveLogInLocalStorage();
                this.renderLogfoods();
                this.renderWeekCals();
          }
        });
       
        return;
      }
    });

    // ================= the products page ====================
    // ========================================================
    this.searchProductBtn.addEventListener("click", async (e) => {
      let productValue = this.productSearchInput.value;
      if (!productValue) {
        this.compUi.showEmptyState();
        return;
      }
      this.compUi.showSpinner(this.productsGrid);
      let products = await this.mealAPI.searchproduct(productValue);
      if (!products || products.length === 0) {
        this.compUi.showEmptyState();
        return;
      }
      this.compUi.displaySearchedProduct(products);
    });
    this.productCategoryBtns.forEach((productBtn) => {
      productBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        let dataCategory = productBtn.getAttribute("data-category");
        // console.log(dataCategory) ;
        this.compUi.showSpinner(this.productsGrid);
        let data = await this.mealAPI.searchproduct(dataCategory);
        if (data.length === 0 || !data) {
          this.compUi.showEmptyState();
          return;
        }
        this.compUi.displaySearchedProduct(data);
      });
    });

    document.addEventListener("click", async (e) => {
      const productCard = e.target.closest(".product-card");
      if (!productCard) return;
      let barcode = productCard.getAttribute("data-barcode");
      // console.log(barcode)
      this.proData = await this.mealAPI.searchproductBybarcode(barcode);
      console.log(this.proData);
      if (!this.proData || this.proData.length === 0) return;
      this.compUi.displayProductDetails(this.proData);
    });
    document.addEventListener("click", (e) => {
      // console.log(e.target) ;
      if (!this.compUi.productDetailsContainer.classList.contains("hidden")) {
        this.compUi.closeModal(e.target);
      }
    });
    document.addEventListener("click", (e) => {
      e.preventDefault();
      const addProductToLog = e.target.closest(".add-product-to-log");
      if (addProductToLog) {
        this.compUi.closeModal(document.querySelector(".close-product-modal"));
        this.appS.addFoodOrProduct(
          this.proData.name,
          "product",
          this.proData.nutrients,
          this.proData.barcode,
          this.proData.image,
          this.proData.brand,
        );
        this.appS.saveLogInLocalStorage();
        const n = this.appS.calcTotalNutritons();
        this.compUi.showFoodLog(this.appS.logs, n);
        this.renderWeekCals();
      }
    });
    this.lookupBarcodeBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const barcodeInput = document.querySelector("#barcode-input");
      let barcode = barcodeInput.value.trim();
      if (!this.barcodeRejex.test(barcode)) {
        this.compUi.showEmptyState();
        return;
      }
      this.compUi.showSpinner(this.productsGrid);
      try {
        let data = await this.mealAPI.searchproductBybarcode(barcode);
        if (!data || (Array.isArray(data) && data.length === 0)) {
          this.compUi.showEmptyState();
          return;
        }

        // console.log(data , barcode)
        let arrayOfObject = [data];

        this.compUi.displaySearchedProduct(arrayOfObject);
        this.compUi.displayProductDetails(data);
      } catch (error) {
        console.error("fetch error :", error);
        this.compUi.showEmptyState();
      }
    });
    let currentFilterBtn = "";
    this.nutriScoreFilterBtns.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        currentFilterBtn = this.compUi.activeNutriScore(currentFilterBtn, btn);
        let grade = btn.getAttribute("data-grade");
        console.log(grade);
        let term = this.productSearchInput.value.trim();
        // console.log(term)

        if (!term) {
          return;
        }
        // console.log(term)
        this.compUi.showSpinner(this.productsGrid);
        try {
          let filteredData = [];
          if (grade === "all") {
            filteredData = await this.mealAPI.searchproduct(term);
          } else {
            let data = await this.mealAPI.searchproduct(term, false);
            if (!data || data.length === 0) {
              this.compUi.showEmptyState();
              return;
            }
            for (const product of data) {
              if (product.nutritionGrade === grade) {
                filteredData.push(product);
                if (filteredData >= 24) {
                  break;
                }
              }
            }
          }

          if (!filteredData || filteredData.length === 0) {
            this.compUi.showEmptyState();
            return;
          }
          this.compUi.displaySearchedProduct(filteredData);
        } catch (error) {
          console.error("filter error :", error);
          this.compUi.showEmptyState();
        }
      });
    });
    // ================= the Logs page ====================
    // ========================================================

    document.addEventListener("click", (e) => {
      e.preventDefault();
      const quickLogBtn = e.target.closest(".quick-log-btn");
      if (quickLogBtn) {
        const quickData = quickLogBtn.getAttribute("quick-data");
        if (quickData === "recipe") {
          this.compUi.transferBetweenPages(this.currentPage, this.pages[0]);
          this.compUi.transferBetweenNavLinks(
            this.currentNavLink,
            this.navLinks[0],
          );
          this.currentPage = this.pages[0];
          this.currentNavLink = this.navLinks[0];
        } else {
          this.compUi.transferBetweenPages(this.currentPage, this.pages[1]);
          this.compUi.transferBetweenNavLinks(
            this.currentNavLink,
            this.navLinks[1],
          );
          this.currentPage = this.pages[1];
          this.currentNavLink = this.navLinks[1];
        }
      }
    });
  }
  // ================= the Logs page ====================
  // ========================================================
  renderLogfoods() {
    let total = this.appS.calcTotalNutritons();
    this.compUi.showFoodLog(this.appS.logs, total);
  }
  renderWeekCals() {
    this.appS.archiveDay();
    const week = this.appS.getLastWeek();
    this.compUi.showWeekCals(week);
  }
}

const app = new App();
// const api = new MealsApi() ;
app.init();
// const x = await api.getRandomMeals()
// console.log(x) ;
