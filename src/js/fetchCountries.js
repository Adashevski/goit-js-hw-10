export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching countries:', error);
      return [];
    });
}
