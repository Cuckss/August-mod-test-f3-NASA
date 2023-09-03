let searchInput=document.getElementById('search-input');
let searchButton=document.getElementById('search-btn');
let unorderedList=document.getElementById('search-history')
const api_key='Ltjpk8kHLucWALEvm0jKctq4csEDndFVzPB8TypO';
function getCurrentDate() {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
   const day = String(currentDate.getDate()).padStart(2, '0');
   
   const formattedDate = `${year}-${month}-${day}`;
   
   return formattedDate;
}

const currentDateInYYYYMMDD = getCurrentDate();
console.log(currentDateInYYYYMMDD);

function preventFunction(event){
   event.preventDefault();
  
   
}
async function getCurrentImageOfTheDay(){
   
   let url=`https://api.nasa.gov/planetary/apod?date=${currentDateInYYYYMMDD}&api_key=${api_key}`
   let response=await fetch(url);
    let data=await response.json();
   let currentImageContainer=document.getElementById('current-image-container');
   currentImageContainer.innerHTML=`
   <h1>NASA Picture of the day</h1>
   <img src="${data.url}" >
   <h2>${data.title}</h2>
   <div>${data.explanation}</div>
   `
}
getCurrentImageOfTheDay();
let date;
searchButton.addEventListener('click', function () {
  
    date = searchInput.value;
   console.log(date); // Capture the input value when the button is clicked
   // convertDate(searchInputValue);
   
   fetchDetails();
});
  
 

async function fetchDetails(){
    let url=`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`
    let response=await fetch(url);
    let data=await response.json();
    console.log(data);
    getImageOfTheDay(data);
    saveSearch(data);
    addSearchToHistory(data);
}
function getImageOfTheDay(data){
   let currentImageContainer=document.getElementById('current-image-container');
   currentImageContainer.innerHTML=`
   <h1>Picture On ${data.date}</h1>
   <img src="${data.url}" >
   <h2>${data.title}</h2>
   <div>${data.explanation}</div>
   `
}
function saveSearch(data){
   if(localStorage.getItem('searches')){
      let datesArray=JSON.parse(localStorage.getItem('searches'));
      datesArray.push({ date: data.date });
     
      localStorage.setItem('searches',JSON.stringify(datesArray));
   }else{
      let datesArray=[{"date":data.date}];
      localStorage.setItem('searches',JSON.stringify(datesArray))
   }  
}
function addSearchToHistory(data){

const listItem = document.createElement('li');
listItem.textContent = data.date;
listItem.setAttribute('class','unorder');
// Attach a click event listener to the list item
listItem.addEventListener('click', function() {
    retrieveData(data);
});

unorderedList.appendChild(listItem);
    
}

async function retrieveData(data){
   let url=`https://api.nasa.gov/planetary/apod?date=${data.date}&api_key=${api_key}`

    let response=await fetch(url);
    let data1=await response.json();
   getImageOfTheDay(data1);
   console.log(data1)
   console.log("hii guyzz")

}



























