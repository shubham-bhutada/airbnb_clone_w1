const destination = document.getElementById("destination");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const guests = document.getElementById("guests");

const storedData = localStorage.getItem("userData");
if (storedData) {
  const data = JSON.parse(storedData);
  console.log(data);
  destination.value = data.text;
  checkIn.value = data.startDate;
  checkOut.value = data.endDate;
  guests.value = `${data.guests} guests`;
}

const url =
  "https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2024-09-16&checkout=2024-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4734733855msh50cf40266d1af5ap1f8284jsn3bf9b9512ceb",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

async function getData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    renderData(result.results);
    console.log(result);
    console.log(result.results);
  } catch (error) {
    console.error(error);
  }
}

getData();


const cardsSection = document.getElementById("cards-section");

function renderData(array) {
  cardsSection.innerHTML = "";
  array.forEach(element => {
    if(element.city === destination.value) {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                         <img id="cardImage" src=${element.images[0]}>
                         <div class="cardRightSide">
                           <div id="cardTopSection">
                             <p>Entire home in ${element.city}</p>
                             <h3>${element.name}</h3>
                           </div>
                           <div id="cardMiddleSection">
                             <span>${element.persons} guests</span>
                             <span>${element.type}</span>
                             <span>${element.beds} beds</span>
                             <span>${element.bathrooms} bath</span>
                             </br>
                             <span>${element.previewAmenities}</span>
                           </div>
                           <div id="cardLowerSection">
                             <div id="cardlsLeft">
                               <p>${element.rating}</p>
                               <img src="./assets/star.svg" id="star">
                               <p>(${element.reviewsCount} reviews)</p>
                             </div>
                             <div id="cardlsRight">
                               <h6>$${element.price.total} <span>/night</span></h6>
                             </div>
                           </div>
                         </div>`
        
                         
        cardsSection.appendChild(card);                 
    }
  });
}