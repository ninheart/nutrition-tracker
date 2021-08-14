document.getElementById('nutriForm').addEventListener("submit",addFood);

const foods = JSON.parse(localStorage.getItem("foods")) || [];

function roundNum(num){
 return Math.round(num*100)/100;
}

function addFood(event){
 event.preventDefault();
 let name = document.getElementById("food").value;
 let calorie = document.getElementById('calorie').value;
 let protein = document.getElementById("protein").value;
 let fat = document.getElementById("fat").value;
 let carbs = document.getElementById("carbs").value;

 if(name.length > 0 && calorie != 0){
  const food = {
   name,
   calorie,
   protein,
   fat,
   carbs,
   id: foods.length > 0 ?
   foods[foods.length - 1].id + 1 : 1,}
   foods.push(food);
   localStorage.setItem("foods",JSON.stringify(foods));
  }
  document.getElementById('nutriForm').reset();

  showFoods();


}

const showFoods = () =>{
 const foodTable = document.getElementById("microTable");
 foodTable.innerHTML = "";

 for(let i = 0; i < foods.length; i++){
  foodTable.innerHTML += `
  <tr>
  <td>${foods[i].name}</td>
  <td>${parseFloat(foods[i].calorie) + ' cal'}</td>
  <td>${parseFloat(foods[i].protein) + ' g'}</td>
  <td>${parseFloat(foods[i].fat) + ' g'}</td>
  <td>${parseFloat(foods[i].carbs) + ' g'}</td>
  <td><button id = "deleteButton" 
  onclick = deleteFood(${
    foods[i].id
  });window.location.reload();>Delete</button><td>
  </tr>
  `
 }
}

const deleteFood = (id) => {
 for(let i = 0; i < foods.length; i++){
  if(foods[i].id == id){
   foods.splice(i,1);
  } 
 }

 localStorage.setItem("foods",JSON.stringify(foods));
 showFoods();
}

function calcCalorie(){
 let totalCalorie = 0;
 let totalProtein = 0;
 let totalFat = 0;
 let totalCarbs = 0;
 for(i = 0; i < foods.length; i++){
  totalCalorie += parseFloat(foods[i].calorie);
 }
 for (i = 0; i < foods.length; i++) {
   totalProtein += parseFloat(foods[i].protein)
 }
 for (i = 0; i < foods.length; i++) {
   totalFat += parseFloat(foods[i].fat)
 }
 for (i = 0; i < foods.length; i++) {
   totalCarbs += parseFloat(foods[i].carbs)
 }
 caloriesSum.innerHTML = roundNum(totalCalorie) + " cal";
 proteinsSum.innerHTML = roundNum(totalProtein) + ' grams';
 fatsSum.innerHTML = roundNum(totalFat) + " grams";
 carbsSum.innerHTML = roundNum(totalCarbs) + " grams";

}


showFoods();
calcCalorie();