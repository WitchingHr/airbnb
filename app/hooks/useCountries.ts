import countries from 'world-countries';

// format countries
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

// hook
const useCountries = () => {
  // function to get all formatted countries
  const getAll = () => formattedCountries;

  // function to get a formatted country by value
  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  // return functions
  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
