const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");

weatherForm.addEventListener("submit", event => {
   event.preventDefault();
   const location = search.value;

   fetch("/weather?location=" + location).then(response => {
      response.json().then(data => {
         forecast.textContent = data.forecastSummary;
      });
   });
});
