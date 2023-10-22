const destination = document.getElementById("destination");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const guests = document.getElementById("guests");
const searchbtn = document.getElementById("submitSearchBtn");

searchbtn.addEventListener("click", function () {
  let destinationValue = destination.value;
  const startDate = checkIn.value;
  const endDate = checkOut.value;
  const guestsValue = guests.value;

  const data = {
    text: destinationValue,
    startDate: startDate,
    endDate: endDate,
    guests: guestsValue,
  };

  const dataJSON = JSON.stringify(data);
  localStorage.setItem("userData", dataJSON);

  window.location.href = "standardSearch.html";
});
