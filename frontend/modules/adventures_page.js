import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city = search.slice(6);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let result = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    let data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    let childDivElement = document.createElement("div");
    childDivElement.className = "col-6 col-lg-3 mb-4 position-relative";
    childDivElement.innerHTML = `
            <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
            <div class="category-banner">${adventure.category}</div>
              <div class="activity-card">

                <img
                  class="img-responsive"
                  src=${adventure.image}
                  alt=${adventure.name}
                />

                <div class="card-body w-100 pb-0 mb-0">
                <div class="d-flex justify-content-between align-items-centre flex-column flex-md-row">
                  <h6>${adventure.name}</h6>
                  <p>₹${adventure.costPerHead}</p>
                </div>
                <div class="d-flex justify-content-between align-items-centre flex-column flex-md-row">
                  <h6>Duration</h6>
                  <p>${adventure.duration} Hours</p>
                </div>
              </div>
              </div>
            </a>
          `;

    document.getElementById("data").appendChild(childDivElement);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurationList = [];
  for (let element of list) {
    if (element.duration >= low && element.duration <= high) {
      filteredDurationList.push(element);
    }
  }
  return filteredDurationList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredCategoryList = [];
  for (let element of list) {
    if (categoryList.includes(element.category)) {
      filteredCategoryList.push(element);
    }
  }
  return filteredCategoryList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  let filteredList = [];
  if (filters.duration != "") {
    let durationArray = filters.duration.split("-");
    let low = durationArray[0];
    let high = durationArray[1];
    if (filters.category != "") {
      let filteredDurationList = filterByDuration(list, low, high);
      filteredList = filterByCategory(filteredDurationList, filters.category);
    } else {
      filteredList = filterByDuration(list, low, high);
    }
  } else if (filters.category != "") {
    filteredList = filterByCategory(list, filters.category);
  } else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem("filters",JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryListElement = document.getElementById("category-list");
  for (let categoryName of filters.category) {
    let categoryPillElement = document.createElement("p");
    categoryPillElement.setAttribute("id", categoryName);
    categoryPillElement.className = "category-filter";
    categoryPillElement.innerHTML = `${categoryName}<span class="close" id="${categoryName} "onclick="closeSinglePillEvent(${categoryName})">&times;</span>`;
  }
  let durationElement = document.getElementById("duration-select");
  durationElement.value = filters.duration;
}

export {
  getCityFromURL,
  fetchAdventures,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
