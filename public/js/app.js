fetch("http://localhost:3000/weather?location=boston").then(response => {
   response.json().then(data => {
      console.log(data);
   });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");

weatherForm.addEventListener("submit", event => {
   event.preventDefault();
   const location = search.value;

   fetch("http://localhost:3000/weather?location=" + location).then(
      response => {
         response.json().then(data => {
            forecast.textContent = data.forecastSummary;
         });
      }
   );
});
