import axios from 'axios';

const url = 'https://restcountries.eu/rest/v2/all';

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}`);

    const countries = data.map((country) => country.name);

    return countries;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocation = async (name) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.eu/rest/v2/name/${name}`
    );

    const location = data[0].latlng;

    return location;
  } catch (error) {
    console.log(error);
  }
};
