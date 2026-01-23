export default class appState{
  constructor(){
    this.logs = JSON.parse(localStorage.getItem('foods')) || [] ; 
    this.calsOverWeek = JSON.parse(localStorage.getItem('weekCals')) || [] ; 
    this.totalCals = 0 ;
    this.currentDay  ; 
    this.totalNutritions = {
        cal: 0,
        pro : 0 ,
        carbs : 0,
        fat:0
    } ;  
  }

addFoodOrProduct(name , type, nutritions , id , imgSrc , numOfservingOrBrand ){
    if (!name ||!type || !nutritions || !id || !numOfservingOrBrand || !imgSrc) return;
    const obj = {
        id ,
        numOfservingOrBrand,
        imgSrc,
        name,
        type,
        nutritions,
        addedAt: new Date().toLocaleTimeString('en-US', {  hour: 'numeric',  minute: '2-digit', hour12: true }),
        dateDisplay: new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
        } ; 
    this.logs.push(obj)
    this.saveLogInLocalStorage() ;
  }
saveLogInLocalStorage(){
    localStorage.setItem('foods' , JSON.stringify(this.logs))
  }
  
calcTotalNutritons(){
    let totals = { cal: 0, pro: 0, carbs: 0, fat: 0 };
    let {cal , pro, carbs , fat} = totals ; 
    let serv ;
    this.logs.forEach(log =>{
      if(log.type !== 'recipe'){
         serv = 1 ; 
      }else{
        serv = log.numOfservingOrBrand ; 
      }
         cal += (log.nutritions.calories*serv) ; 
         pro += (log.nutritions.protein*serv) ; 
         carbs += (log.nutritions.carbs*serv) ; 
         fat += (log.nutritions.fat*serv) ; 
    })
    totals = { cal, pro, carbs, fat };
    this.totalNutritions = totals ; 

 return this.totalNutritions ; 
  }
deleteLogItem(idx){
   
    this.logs.splice(idx ,1) ; 
    this.saveLogInLocalStorage() ; 
     this.calcTotalNutritons() ; 
}

getLastWeek() {
    const week = [];
    for (let i = 6; i >= 0; i--) {
        const toDay = new Date();
        toDay.setDate(toDay.getDate() - i);

        const dayName = toDay.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = toDay.getDate();
        const fullDate = toDay.toLocaleDateString('en-US');
        const dayData = this.calsOverWeek.find(x=>x.fullDate === fullDate) ;
         week.push({
            day: dayName,
            date: dayNumber,
            cals : dayData ? dayData.cals:0 ,
            items :dayData ? dayData.items : 0
        });
    }

    return week;
}
archiveDay(){
const totalCals = this.calcTotalNutritons() ; 
const today = new Date().toLocaleDateString('en-US') ; 
const obj = {
  fullDate : today,
  dayName: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
  dayNum: new Date().getDate(),
  cals: totalCals.cal,
  items: this.logs.length
}
const idx  = this.calsOverWeek.findIndex(x=>x.fullDate === today) ; 
if(idx > -1){
  this.calsOverWeek[idx] = obj ;
}else{
  this.calsOverWeek.push(obj) ; 
}
if(this.calsOverWeek.length > 7 ){
  this.calsOverWeek.pop() ; 
}
localStorage.setItem('weekCals', JSON.stringify(this.calsOverWeek));
}


}