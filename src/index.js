import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', () => {
  const searchValue = searchBox.value.trim();
  if (searchValue.length > 0) {
    fetchCountries(searchValue)
      .then(countries => {
        displayCountries(countries);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
});

function displayCountries(countries) {
  if (countries.length === 1) {
    displayCountryInfo(countries[0]);
  } else {
    const countryListItems = countries
      .map(country => {
        return `<li data-alpha3code="${country.alpha3Code}">${country.name}</li>`;
      })
      .join('');
    countryList.innerHTML = countryListItems;
    countryInfo.innerHTML = '';
    const listItems = countryList.querySelectorAll('li');
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        const alpha3Code = item.getAttribute('data-alpha3code');
        const selectedCountry = countries.find(
          country => country.alpha3Code === alpha3Code
        );
        displayCountryInfo(selectedCountry);
      });
    });
  }
}

function displayCountryInfo(country) {
  const { name, flag, population, region, capital } = country;
  const countryInfoHTML = `
    <h2>${name}</h2>
    <img src="${flag}" alt="Flag of ${name}" />
    <p><strong>Population:</strong> ${population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${region}</p>
    <p><strong>Capital:</strong> ${capital}</p>
  `;
  countryInfo.innerHTML = countryInfoHTML;
  countryList.innerHTML = '';
}
