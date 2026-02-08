export default class MealsApi{
    constructor (){
        this.baseUrl = "https://nutriplan-api.vercel.app/api/meals/" ; 
    }

    async fetchData(endpoint , thereIsKey = false , forProducts = false){

        const options = {};
    let currentBaseUrl = this.baseUrl;

    if (forProducts) {
        currentBaseUrl = "https://nutriplan-api.vercel.app/api/products/";
    }
    if (thereIsKey) {
        
        options.headers = {
            'x-api-key': 'AJbXaMy6m5qeeS47a0ZmrhoxwCtlsGUwF2x8fyPW'
        };
        
        currentBaseUrl = "https://nutriplan-api.vercel.app/api/nutrition/";
    }

        try {
            const response = await fetch(`${currentBaseUrl}${endpoint}`,options) ;
            if( !response.ok){
                throw new Error('failed to fetch data !')
            }
            return await response.json() ; 
        } catch (error) {
            console.error('api error' + error)
            throw error ; 
        }
    }
    async getAllCategories(){
        const data = await this.fetchData(`categories`) ; 
        return  data.results ; 
    }

    async getAllAreas(){
        const data = await this.fetchData('areas') ; 
        return  data.results ; 
    }
    async getRandomMeals(){
        const data = await this.fetchData('random?count=25') ; 
        return  data.results ; 
    }
    

    async filterMaelByCategoriy(catagory){
        const data = await this.fetchData(`filter?category=${catagory}&limit=25`) ; 
        return  data.results ; 
    }
    async filterMaelByArea(area){
        const data = await this.fetchData(`filter?area=${area}&limit=25`) ; 
        return  data.results ; 
    }
    async getMealById(id){
        const data = await this.fetchData(id) ; 
        return  data.result ; 
    }
    async searchMeal(term){
        const data = await this.fetchData(`search?q=${term}&page=1&limit=25`) ; 
        return  data.results ; 
    }
    
    async getNutritionFacts(meal){
        
        const ingredientFormat = meal.ingredients.map(ing=>`${ing.measure}${ing.ingredient}`)
        let recipeData = {
            recipeName:meal.name ,
            ingredients: ingredientFormat
        };
        const part1 = "AJbXaMy6m5qeeS4";
        const part2 = "7a0ZmrhoxwCtlsGUwF2x8fyPW";
        const apiKey = part1 + part2;
        const options = {
        method : 'Post' , 
        headers: {
            'x-api-key': apiKey, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(recipeData)
    }

        try {
            const response = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", options) ;
            if( !response.ok){
                throw new Error('failed to fetch data !')
            }
            const result =  await response.json() ; 
            if(result){
                return result.data ;
            }

        } catch (error) {
            console.error('api error' + error)
            throw error ; 
        }
    }
     async searchproduct(term , isLimited = true){
       let  limit = '&limit=24' ;
        if(!isLimited){
            limit = '&limit=100' ;
        }
        const data = await this.fetchData(`search?q=${term}${limit}` , false , true) ; 
        return  data ; 
    }
     async searchproductBybarcode(barcode){
        const data = await this.fetchData(`barcode/${barcode}` , false , true) ; 
        return  data.result ; 
    }


}
