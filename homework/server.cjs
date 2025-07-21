const express = require('express') //bring in express, require is for import
const app = express() //set up the server application



//HAS TO BE UNDERNEATH ALL THE STATIC, DYNAMIC NEEDS TO BE AT THE END
app.get('/greetings/:username', (req, res) => {
  // Accessing the parameter
  console.log(req.params.username);  // Output could be 123, 456, etc.

  // Sending a response with the parameter
  res.send(`<h1>What a delight to see you once more, ${req.params.username}</h1>`);
});



//2- ROUTE TO HANDLE A RANDOM ROLL NUMBER (FROM 0 TO MAX INCLUSIVE)
app.get('/roll/:number', (req, res) => {
    console.log(req.params.number);

    //Checks if the params.number is a valid number
    const numberCheck = parseInt(req.params.number);

    //Prints error if something Not A Number is entered
    if (isNaN(numberCheck)){
        return res.send("You must specify a number...");
    }

    //Generating a random number from 0 till max (inclusive)
    const rolled = Math.floor(Math.random()*(numberCheck + 1));
    res.send(`You rolled a ${rolled}.`)
});


//3- Collectibles: I WANT THAT ONE!!!

// Create the data array of the collectibles
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Create the route for the collectibles

app.get('/collectibles/:index', (req, res) => {
    const collectiblesIndex = Number(req.params.index);

    //Checks if the index is an integer
    if (isNaN(collectiblesIndex) || !Number.isInteger(collectiblesIndex) || collectiblesIndex < 0){
        return res.send("The item is not yet in stock. Check back soon!")
    }

    const indexCheck = Number(collectiblesIndex); //converts the index from string to a number
    const item = collectibles[indexCheck]; //access the required element in the array

    //Checks if the item does not exist at the given index
    if (!item){
        return res.send("This item is not yet in stock. Check back soon")
    }

    //output message
    res.send(`So, you want the ${item.name}? For ${item.price}, it's all yours!`);
});



// 4 -  Filter Shoes by Query Parameters

// Creating the show array
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//Route to handle /shoes with optional filtering
app.get('/shoes', (req, res) => {
  let filteredShoes = shoes; //references the shoe array for filtering purpose

  const min = parseFloat(req.query['min-price']); //gets value of min-query from the URL
  const max = parseFloat(req.query['max-price']); //gets value of max-query from the URL
  const type = req.query.type; //gets shoe type without conversion

  //Applies the min-price filter 
  if (!isNaN(min)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= min);
  }

  //Applies the max-price filter
  if (!isNaN(max)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= max);
  }

  // Apply type filter
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes); //filters the shoe
});


app.listen(3001, () => {
    console.log('Everything is gravy...') //everytime u update it prints here
})

