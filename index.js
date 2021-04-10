// Import stylesheets
import "./style.css";

const apiKey = "5c546389656e9425c3eb5ec97f1a0188";
const URL =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" +
  apiKey +
  "&units=metric&q=";
var cityElems = Array.from(document.getElementsByClassName("citta"));
for (let elem of cityElems) {
  elem.onclick = () => display(elem.innerHTML);
}
document.getElementById("calcoloMassimo").onclick = () => massimo();

function doCity(city, callback) {
  let promise = fetch(URL + city)
    .then(response => response.json(), error => alert(error))
    .then(data => callback(data));
  return promise;
}
async function display(city) {
  let t = await doCity(city, data => data.main.temp);
  document.getElementById("risposta").innerHTML =
    "A " + city + " ci sono " + t + " gradi";
}
async function massimo() {
  let temps = await Promise.all(
    cityElems.map(cityElem =>
      doCity(cityElem.innerHTML, data => data.main.temp_max)
    )
  );
  var massimo = temps.reduce((maxx, temp) => Math.max(temp, maxx));
  document.getElementById("massimo").innerText = massimo;
}
