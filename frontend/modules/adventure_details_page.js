import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let searchArray = search.split("=");
  return searchArray[1];
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let result = await fetch(config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);
    let data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureId = adventure.id;
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  let adventureImages = adventure.images;
  for(let image of adventureImages){
    let imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.className = "img-responsive activity-card-image";
    document.getElementById("photo-gallery").appendChild(imageElement);
  }
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carouselDiv = document.createElement("div");
  carouselDiv.id = "carouselDiv";
  carouselDiv.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner" id="carouselImages">
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                            </div>`;
  document.getElementById("photo-gallery").innerHTML = carouselDiv.innerHTML;
  for(let image of images){
    let carouselImageItem = document.createElement("div");
    carouselImageItem.className = "carousel-item";
    carouselImageItem.setAttribute("data-bs-interval","5000")
    carouselImageItem.innerHTML = `<img src=${image} class="d-block w-100 img-responsive activity-card-image" alt="...">`;
    document.getElementById("carouselImages").appendChild(carouselImageItem);
  }
  document.getElementById("carouselImages").firstElementChild.className = "carousel-item active";
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = (persons * adventure.costPerHead);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  let reservationUrl = config.backendEndpoint + "/reservations/new";
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let formElements = form.elements;
    let data = {
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    };
  const options = {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(data),
    };
  try {
    let result = await fetch(reservationUrl,options);
    let resultJSON = await result.json();
    console.log(resultJSON);
    if(resultJSON == null || resultJSON == ""){
      alert("Failed");
      throw Error("Failed");
    }
    alert("Success!");
  } catch (error) {
      console.log(error);
  }
  });
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
