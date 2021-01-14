/** Globals */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const param = '&units=metric';
const apiKey = '&appid=121a1a096f7081ffea2ee48532eebc1e';
const date = new Date().toISOString().slice(0, 10);
const clientData = { 'date': date };


/** Helper functions */
function makeURL(zip) {
    return baseURL + zip + param + apiKey;
}

/** API functions */
const getWeatherData = async (url) => {
    const response = await fetch(url);

    try {
        const data = await response.json();
        const temp = data.weather[0].main + ', ' + data.main.temp + ' degrees Celsius';
        clientData['temperature'] = temp;
    } catch (error) {
        console.log("Error: ", error);
    }

};

const postEntry = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("Error: ", error);
    }
};

const getEntry = async (url = '') => {
    const response = await fetch(url);

    try {
        const newEntry = await response.json();
        addEntryToDom(newEntry)
        return newEntry

    } catch (error) {
        console.log('Error: ', error)
    }
};

/** Eventlisters & event functions*/
document.querySelector('#generate').addEventListener("click", newEntry);

function newEntry(e) {
    const userResponseInput = document.querySelector('#feelings');
    const zipInput = document.querySelector('#zip');
    const zip = zipInput.value;
    clientData['user_response'] = userResponseInput.value;
    userResponseInput.value = '';
    zipInput.value = '';
    getWeatherData(makeURL(zip))
        .then(function () {
            postEntry('/journalentry', clientData);
        })
        .then(function () {
            getEntry('/journalentry');
        });
};

/** Update DOM */

function addEntryToDom(data) {
    document.querySelector('#date').innerHTML = data.date;
    document.querySelector('#temp').innerHTML = data.temperature;
    document.querySelector('#content').innerHTML = data.user_response;

}

