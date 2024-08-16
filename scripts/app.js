const app = Vue.createApp({
    // The data function returns the initial state of our application
    data() {
        return {
            randomFact: '',       // Stores a random fact
            weatherInfo: '',      // Stores information about the weather
            city: 'London Ontario', // Default city to get the weather for
            word: '',             // Stores the word we want to define
            definition: ''        // Stores the definition of the word
        };
    },
    methods: {
        // Function to get a new random fact
        getNewFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random') // API URL to get a random fact
                .then(response => response.json()) // Convert the response to JSON
                .then(data => {
                    this.randomFact = data.text; // Update the randomFact data property with the new fact
                })
                .catch(error => console.log('Error fetching fact:', error)); // Log errors if any
        },
        // Function to fetch weather information
        fetchWeather() {
            const url = `https://goweather.herokuapp.com/weather/${(this.city)}`; // Construct the API URL with the city name
            fetch(url) // Fetch weather data from the API
                .then(response => response.json()) // Convert the response to JSON
                .then(data => {
                    // Update the weatherInfo data property with the fetched weather details
                    this.weatherInfo = `
                        Temperature: ${data.temperature} <br>
                        Wind Speed: ${data.wind} <br>
                        Description: ${data.description}
                    `;
                })
                .catch(error => console.log('Error fetching weather:', error)); // Log errors if any
        },
        // Function to fetch the definition of a word
        fetchDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`) // API URL to get word definition
                .then(response => response.json()) // Convert the response to JSON
                .then(data => {
                    const wordData = data[0]; // Get the first result from the API response
                    const phonetic = wordData.phonetic || 'N/A'; // Use 'N/A' if phonetic is not available
                    const partOfSpeech = wordData.meanings[0]?.partOfSpeech || 'N/A'; // Use 'N/A' if part of speech is not available
                    const definition = wordData.meanings[0]?.definitions[0]?.definition || 'No definition available'; // Use default text if definition is not available

                    // Update the definition data property with the word details
                    this.definition = `
                        Word: ${wordData.word} <br>
                        Phonetic: ${phonetic} <br>
                        Part of Speech: ${partOfSpeech} <br>
                        Definition: ${definition}
                    `;
                })
                .catch(error => console.log('Error fetching definition:', error)); // Log errors if any
        }
    },
    // runs after the component has been mounted
    mounted() {
        this.getNewFact(); // Fetch a random fact when the app is loaded
        this.fetchWeather(); // Fetch the weather for the default city when the app is loaded
    }
});

// Mount the Vue application to the HTML element with id 'app'
app.mount('#app');
