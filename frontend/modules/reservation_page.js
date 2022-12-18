import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let result = await fetch(config.backendEndpoint + "/reservations/");
    let data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 console.log(reservations);
  if(reservations == null || reservations == ""){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    let reservationTable = document.getElementById("reservation-table");
    for(let ele of reservations){
      let bookingDate = new Date(ele.date).toLocaleDateString("en-IN");
      let bookingTime = new Date(ele.time).toLocaleString("en-IN", {
                                        year: "numeric",
                                        day: "numeric",
                                        month: "long",
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric",
                                        hour12: true,
                                      }).replace(" at",",");

      let reservationTableRow = document.createElement("tr");
      reservationTableRow.innerHTML = `<td>${ele.id}</td>
                                       <td>${ele.name}</td>
                                       <td>${ele.adventureName}</td>
                                       <td>${ele.person}</td>
                                       <td>${bookingDate}</td>
                                       <td>${ele.price}</td>
                                       <td>${bookingTime}</td>
                                       <td id =${ele.id}><a href="../detail/?adventure=${ele.adventure}" class="reservation-visit-button">View Adventure</a></td>`; 
      reservationTable.appendChild(reservationTableRow);
    }
  }

}

export { fetchReservations, addReservationToTable };
