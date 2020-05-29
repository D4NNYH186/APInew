const request = require('request');
const {promisify} = require('util');

require('dotenv').config()

const promisifiedRequest = promisify(request);

const getPoke = async (pokemon) => {
    let data = await promisifiedRequest({
        uri: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        json: true
    })
    return data.body;
}

const getChuck = async () => {
    let data = await promisifiedRequest({
        uri: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
            'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            'x-rapidapi-key': '610aabc965msh2e6b12bbc5ef8ecp10795ajsne871aee0e0ce',
            accept: 'application/json'
        }
    })
    return data.body;

}

const getMeme = async (count) => {
    console.log(count)
    let data = await promisifiedRequest({

        url: `https://meme-api.herokuapp.com/gimme/dankmemes/${count}`,
        json: true,

    })
    console.log(data.body);
    return data.body;
}



module.exports = {
    getPoke,
    getChuck,
    getMeme,
    
}
