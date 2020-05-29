const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const getApi = require('./lib/getApi');

require('dotenv').config;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.get('/poke', async(req,res)=>{
    let backgroundImage = "poke-bg.jpg";
    console.log(backgroundImage)
    res.render('poke', {backgroundImage})
});


app.post('/poke', async (req, res)=> {
    let pokemon = req.body.pokemon
    let data = await getApi.getPoke(pokemon)
    console.log(data.order)
    let backgroundImage = "poke-bg.jpg";
    let name = data.species.name;
    let base_stat = data.stats[0].base_stat;
    let weight = data.weight;
    let ability_1 = data.abilities[0].ability.name;
    let ability_2 = data.abilities[1].ability.name;
    console.log(name);
    res.render('poke',{backgroundImage, data:{name, base_stat, weight, ability_1, ability_2}})
});

app.get('/norris', async(req, res)=>{
    let backgroundImage = "norris.jpg";

    res.render('norris', {backgroundImage})
});

app.post('/norris', async(req, res)=> {
    // background image sending it to the body of each page
    let backgroundImage = "norris.jpg"
    // storing the data returned from the api to the variable 'data'
    // we are going to be using this throughout the post method.
    let data = await getApi.getChuck();

    // parsing the data as json allows access to each key:value pair
    data = JSON.parse(data)
    console.log(data)

    let joke = data.value
    
    
    // rendering joke taken from the let joke = data.value
    res.render('norris', {
        backgroundImage, 
        joke: joke
    })
});

app.get('/meme', async(req, res)=>{
    let backgroundImage = "meme.jpg";
    res.render('meme', {backgroundImage})
})

app.post('/meme', async(req, res)=>{
    let count = req.body.count;
    let data = await getApi.getMeme(count);
    let backgroundImage = "meme.jpg";
    let name = data.memes[0].title;
    let url = data.memes[0].url;
    res.render('meme', {backgroundImage, name, url})
});

app.listen(3001,()=>{
    console.log('server is listening on port 3001')
})