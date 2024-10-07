const axios = require('axios');

const getcountryData = async (countryCode) => {
    try {
        const response  = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        const countryData = response.data;

        if (!countryData) {
            return {
                message: 'Country not found',
                data: []
            }
        }

        return {
            commonName: countryData.commonName,
            officialName: countryData.officialName,
            countryCode: countryData.countryCode,
            region: countryData.region,
            borders: countryData.borders || [],
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching border countries');
    }
};

const getPopulationData = async (countryName) => {
    try {
        const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`);
        const populationData = response.data.data;

        // search country population
        const countryPopulation = populationData.find(country => country.country === countryName);

        if (!countryPopulation) {
            // throw new Error('Country population not found');
            return {
                message: 'Country population not available',
                data: []
            }
        }

        return countryPopulation.populationCounts;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching population data');
    }
};

const getFlagUrl = async (countryName) => {
    try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/flag/images");
        const flagsData = response.data.data;

        // search country
        const countryFlag = flagsData.find(country => country.name === countryName);

        if (!countryFlag) {
            // throw new Error('Country not found');
            return {
                message: 'Country flag not found',
                data: []
            }
        }

        return countryFlag.flag;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching flag url');
    }
};

const getAvailableCountriesData = async () => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching countries');
    }
};

// Get available countries
const getAvailableCountries = async (req, res) => {
    try {
        const countries  = await getAvailableCountriesData();
        res.status(200).json( countries );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching countries' });
    }
};

// Get country Info with borders, population and flag
const getCountryInfo = async (req, res) => {
    const { countryCode } = req.params;
    try {
        const countryData = await getcountryData(countryCode);

        if(!countryData || !countryData.commonName) {
            return res.status(404).json({ message: 'Country not found' });
        }
        
        const population = await getPopulationData(countryData.commonName);
        const flag = await getFlagUrl(countryData.commonName);

        const countryInfo = {
            commonName: countryData.commonName,
            officialName: countryData.officialName,
            countryCode: countryData.countryCode,
            region: countryData.region,
            borders: countryData.borders,
            population,  
            flag
        };

        res.status(200).json( countryInfo );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching country info: ', error: error.message });
    }
}

module.exports = {
    getAvailableCountries,
    getCountryInfo
}