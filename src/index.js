import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const search = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

search.addEventListener(
  'input',
  debounce(async event => {
    const countryName = event.target.value.trim();
    if (countryName === '') {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }
    const countries = await fetchCountries(countryName);
    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countries.length > 1 && countries.length <= 10) {
      countryList.innerHTML = countries
        .map(
          country =>
            `<li><img src="${country.flags.png}"/>
              ${country.name.common}</li>`
        )
        .join('');
    } else if (countries.length === 1) {
      countryList.innerHTML = countries
        .map(
          country =>
            `<li><img src="${country.flags.png}"/>
              ${country.name.common}</li>`
        )
        .join('');
      countryInfo.innerHTML = `<p>Capital: ${countries[0].capital}</p>
          <p>Population: ${countries[0].population}</p>
          <p>Languages: ${Object.values(countries[0].languages).join(
            ', '
          )}</p>`;
    } else {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  }, DEBOUNCE_DELAY)
);
