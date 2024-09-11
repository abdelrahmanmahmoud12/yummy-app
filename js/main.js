//SIDE BAR START
let leftWidth= $('.left').outerWidth();

$('.fa-align-justify').click(function()
    {
        if($('.side-bar').css('left')=='0px')
        {
            $('.side-bar').animate({'left': -leftWidth},1000);
            $('.fa-align-justify').removeClass('fa-times');
        }
        else{
            $('.side-bar').animate({'left': 0},1000)
            $('.fa-align-justify').addClass('fa-times');
        }
    }
)
//SIDE BAR END

//VARIABLES IDENTIFICAION AND HOME START
let httpRequest= new XMLHttpRequest();
let searchTerm=document.querySelector('.searchTerm');
let secSearchTerm=document.querySelector('.sec-SearchTerm');
let searchPage=document.querySelector('.searchPage');
let categoriesPage=document.querySelector('.categoriesPage');
let areaPage=document.querySelector('.areaPage');
let ingredientsPage=document.querySelector('.ingredientsPage');
let CatDetails=document.querySelector('.CatDetails');
let ingDetails=document.querySelector('.ingDetails');
let contact=document.querySelector('.contact');
let meals=[];
httpRequest.open('GET','https://www.themealdb.com/api/json/v1/1/search.php?s');
httpRequest.send();
httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState==4)
    {
        meals= JSON.parse(httpRequest.response);
        displayData();
    }
    
})

function displayData(){
    var cols= '';
    for(var i=0;i<meals.meals.length;i++){
        cols+=
        `
            <div onclick='getFoodInfo(meals.meals[${i}].idMeal)' class="col-md-3 gy-4">
                <div class="layer-box">
                <img class="w-100 rounded-1" src="${meals.meals[i].strMealThumb}" alt="">
                <div class="layer d-flex align-items-center rounded-1">
                    <h2 class="ps-2">${meals.meals[i].strMeal}</h2>
                </div>
                </div>
            </div>
        `
    }
    document.querySelector('#home .container .row').innerHTML=cols;
}
//
async function getFoodInfo(info_Full){
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info_Full}`)
    var instData= await response.json();
    var info= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingrediants").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#fullInfo").removeClass("d-none");
    for(var i=0;i<instData.meals.length;i++){
        if(instData.meals[i].strTags != null){

        info+=
        `
        <div class="col-md-4 ">
        <img class="w-100" src="${instData.meals[i].strMealThumb}" alt="">
        <h2 class="text-center">${instData.meals[i].strMeal}</h2>
    </div>
   <div class="col-md-8">
    <h3>Instructions</h3>
    <p class="">${instData.meals[i].strInstructions}</p>
    <p>Area : ${instData.meals[i].strArea}</p>
    <p>Category : ${instData.meals[i].strCategory}</p>
    <h3>Recipes :</h3>
    <div class="ricepes d-flex flex-wrap">
        <p class="ricepe">${instData.meals[i].strMeasure1}</p>
        <p class="ricepe">${instData.meals[i].strIngredient2}</p>
        <p class="ricepe">${instData.meals[i].strIngredient3}</p>
        <p class="ricepe">${instData.meals[i].strIngredient4}</p>
        <p class="ricepe">${instData.meals[i].strIngredient5}</p>
        <p class="ricepe">${instData.meals[i].strIngredient6}</p>
    </div>
    <h3>Tags :</h3>
    <div class="tags py-2">
        <p class="tag">${instData.meals[i].strTags}</p>
    </div>
    <a target="_blank" href="${instData.meals[i].strSource}" class="btn">Source</a>
    <a target="_blank" href="${instData.meals[i].strYoutube}" class="btn bg-danger">Youtube</a>
    
    </div>
        `
        }
    else{
        info+=
        `
        <div class="col-md-4 ">
        <img class="w-100" src="${instData.meals[i].strMealThumb}" alt="">
        <h2 class="text-center">${instData.meals[i].strMeal}</h2>
    </div>
   <div class="col-md-8">
    <h3>Instructions</h3>
    <p class="">${instData.meals[i].strInstructions}</p>
    <p>Area : ${instData.meals[i].strArea}</p>
    <p>Category : ${instData.meals[i].strCategory}</p>
    <h3>Recipes :</h3>
    <div class="ricepes d-flex flex-wrap">
    <p class="ricepe">${instData.meals[i].strMeasure1}</p>
    <p class="ricepe">${instData.meals[i].strIngredient2}</p>
    <p class="ricepe">${instData.meals[i].strIngredient3}</p>
    <p class="ricepe">${instData.meals[i].strIngredient4}</p>
    <p class="ricepe">${instData.meals[i].strIngredient5}</p>
    <p class="ricepe">${instData.meals[i].strIngredient6}</p>    </div>
    <h3>Tags :</h3>
    <div class="tags py-2">
    </div>
    <a target="_blank" href="${instData.meals[i].strSource}" class="btn">Source</a>
    <a target="_blank" href="${instData.meals[i].strYoutube}" class="btn bg-danger">Youtube</a>
    
    </div>
        `
    }
        document.querySelector('#fullInfo .container .row').innerHTML=info;
    }
}
//
//VARIABLES IDENTIFICAION AND HOME END


//SEARCH START
searchTerm.addEventListener("keyup", searchInput)
function searchInput(){
    httpRequest.open("Get",`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.value}`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
        meals= JSON.parse(httpRequest.response);
        displayData();
    }
});
$('#home').removeClass('d-none');
}
secSearchTerm.addEventListener("keyup", searchInputTwo)
function searchInputTwo(){
    httpRequest.open("Get",`https://www.themealdb.com/api/json/v1/1/search.php?f=${secSearchTerm.value}`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
        meals= JSON.parse(httpRequest.response);
        displayData();
    }
});
$('#home').removeClass('d-none');
}


searchPage.addEventListener("click",search_Page)
function search_Page(){
    $('#home').addClass('d-none');
    $("#categories").addClass("d-none");
    $("#area").addClass("d-none");
    $("#areaDetails").addClass("d-none");
    $("#catDetails").addClass("d-none");
    $("#ingDetails").addClass("d-none");
    $("#fullInfo").addClass("d-none");
    $("#ingrediants").addClass("d-none");
    $('#search').removeClass('d-none');
    $('.side-bar').animate({'left': -leftWidth},1000);
    $('.fa-align-justify').removeClass('fa-times');

    
}
//SEARCH END


//CATEGORIES START
function displayCategories(){
    var colss= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#area").addClass("d-none");
    $("#catDetails").addClass("d-none");
    $("#ingDetails").addClass("d-none");
    $("#fullInfo").addClass("d-none");

    $("#categories").removeClass("d-none");
    for(var i=0;i<meals.categories.length;i++){
        colss+=
        `
            <div onclick='getCatDetails(meals.categories[${i}].strCategory)' class="col-md-3 gy-5">
                <div class="layer-box">
                <img class="w-100 rounded-1" src="${meals.categories[i].strCategoryThumb}" alt="">
                <div class="layer text-center rounded-1">
                    <h2 class="ps-2">${meals.categories[i].strCategory}</h2>
                    <p class="px-5">${meals.categories[i].strCategoryDescription.substr(0,140)}</p>
                </div>
                </div>
            </div>
        `
    }
    document.querySelector("#categories .container .row").innerHTML=colss
}
//
async function getCatDetails(str_Category){
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${str_Category}`)
    var catData= await response.json();
    var meal= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingrediants").addClass("d-none");
    $("#catDetails").removeClass("d-none");
    for(var i=0;i<catData.meals.length;i++){
        meal+=
        `
            <div onclick='getFoodInfo(catData.meals[${i}].idMeal)' class="col-md-3 gy-4">
                <div class="layer-box">
                <img class="w-100 rounded-1" src="${catData.meals[i].strMealThumb}" alt="">
                <div class="layer d-flex align-items-center rounded-1">
                    <h2 class="ps-2">${catData.meals[i].strMeal}</h2>
                </div>
                </div>
            </div>
        `
        document.querySelector('#catDetails .container .row').innerHTML=meal;
    }
}
//

categoriesPage.addEventListener("click",showcategories)
function showcategories(){
    httpRequest.open("Get",`https://www.themealdb.com/api/json/v1/1/categories.php`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
    meals= JSON.parse(httpRequest.response);
    $('.side-bar').animate({'left': -leftWidth},1000);
    $('.fa-align-justify').removeClass('fa-times');
    displayCategories();
}
})
}
//CATEGORIES END
  
//AREA START
function displayArea(){
    var colsarea= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#area").removeClass("d-none");
    $("#areaDetails").addClass("d-none");

    for(var i=0;i<meals.meals.length;i++){
        colsarea+=
        `
            <div onclick='getAreaDetails(meals.meals[${i}].strArea)' class="col-md-3 gy-5 p-3 border-1 ">
                <div class=" text-center rounded-1">
                <i class="fa-solid fa-city fa-3x"></i>
                    <h2 class="ps-2">${meals.meals[i].strArea.slice(0,10)}</h2>
                </div>
            </div>
        `
    }
    document.querySelector("#area .container .row").innerHTML=colsarea
}
//
async function getAreaDetails(area_Details){
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area_Details}`)
    var areaData= await response.json();
    var area= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingrediants").addClass("d-none");
    $("#catDetails").addClass("d-none");
    $("#ingDetails").addClass("d-none");
    $("#area").addClass("d-none");
    $("#areaDetails").removeClass("d-none");
    for(var i=0;i<areaData.meals.length;i++){
        area+=
        `
            <div onclick='getFoodInfo(areaData.meals[${i}].idMeal)' class="col-md-3 gy-4">
                <div class="layer-box">
                <img class="w-100 rounded-1" src="${areaData.meals[i].strMealThumb}" alt="">
                <div class="layer d-flex align-items-center rounded-1">
                    <h2 class="ps-2">${areaData.meals[i].strMeal}</h2>
                </div>
                </div>
            </div>
        `
        document.querySelector('#areaDetails .container .row').innerHTML=area;
    }
}
//

areaPage.addEventListener("click",showArea)
function showArea(){
    httpRequest.open("Get",`https://www.themealdb.com/api/json/v1/1/list.php?a`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
    meals= JSON.parse(httpRequest.response);
    $('.side-bar').animate({'left': -leftWidth},1000);
    $('.fa-align-justify').removeClass('fa-times');
    displayArea();
}
})
}
//AREA END

//INGREDIANTS START
function displayIngrediants(){
    var colsIng= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#area").addClass("d-none");
    $("#ingrediants").removeClass("d-none");
    for(var i=0;i<meals.meals.length;i++){
        if(meals.meals[i].strDescription != null){
            colsIng+=
            `
                <div onclick='getIngDetails(meals.meals[${i}].strIngredient)' class="col-md-3 gy-5 p-3 border-1 ">
                    <div class=" text-center rounded-1">
                    <i class="fa-solid fa-bowl-food fa-3x"></i>
                        <h2 class="ps-2">${meals.meals[i].strIngredient}</h2>
                        <p class="">${meals.meals[i].strDescription.substr(0,80)}</p>
                    </div>
                </div>
            `
        }
        
    }
    
    document.querySelector("#ingrediants .container .row").innerHTML=colsIng
}
//
async function getIngDetails(ing_Details){
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing_Details}`)
    var ingData= await response.json();
    var ing= '';
    $("#home").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingrediants").addClass("d-none");
    $("#catDetails").addClass("d-none");
    $("#ingDetails").removeClass("d-none");
    for(var i=0;i<ingData.meals.length;i++){
        ing+=
        `
            <div onclick='getFoodInfo(ingData.meals[${i}].idMeal)'  class="col-md-3 gy-4">
                <div class="layer-box">
                <img class="w-100 rounded-1" src="${ingData.meals[i].strMealThumb}" alt="">
                <div class="layer d-flex align-items-center rounded-1">
                    <h2 class="ps-2">${ingData.meals[i].strMeal}</h2>
                </div>
                </div>
            </div>
        `
        document.querySelector('#ingDetails .container .row').innerHTML=ing;
    }
}
//

ingredientsPage.addEventListener("click",showIngrediants)
function showIngrediants(){
    httpRequest.open("Get",`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState==4){
    meals= JSON.parse(httpRequest.response);
    $('.side-bar').animate({'left': -leftWidth},1000);
    $('.fa-align-justify').removeClass('fa-times');
    displayIngrediants();
}
})
}
//INGREDIANTS END


//
$(document).ready(function () {
    $("#loadingScr").fadeOut(500,function(){
        $("body").css("overflow", "visible");
    });
});
//
contact.onclick=function(){
    addCont();
 }
 function addCont(){
    $('#search').addClass('d-none');
    $('#home').addClass('d-none');
    $("#categories").addClass("d-none");
    $("#area").addClass("d-none");
    $("#areaDetails").addClass("d-none");
    $("#catDetails").addClass("d-none");
    $("#ingDetails").addClass("d-none");
    $("#fullInfo").addClass("d-none");
    $("#ingrediants").addClass("d-none");
    $('.side-bar').animate({'left': -leftWidth},1000);
    $('.fa-align-justify').removeClass('fa-times');
    $('#contactus').removeClass(' d-none');

 }