/*
We have the employees drink preference records in a text file (employees.json, added) 
one employee per line, JSON-encoded. We want to organize the party and invite as many employees as possible. 
We've created the JSON files with the drink recipes (recipes.json, added) 
and the prices of the components (prices.json, added). Please, write the program that will accept the party 
budget M and will output the names, user ids, and chosen drinks for the employees that should be invited, 
sorted by user id (ascending). 

    {"id":1,"name":"Mildred Carson","drinks":["Macchiato"]},
    {"id":2,"name":"Clifford Brown","drinks":["Latte"]},
    {"id":3,"name":"Kellie Fletcher","drinks":["Flat White","Espresso"]},
    {"id":4,"name":"Don Parsons","drinks":["Espresso"]},
    {"id":5,"name":"Renee Reynolds","drinks":["Cappuccino","Macchiato"]},
    {"id":6,"name":"Rudolph Bishop","drinks":["Latte","Macchiato","Flat White"]},
    {"id":7,"name":"Geraldine Carpenter","drinks":["Espresso"]},
    {"id":8,"name":"Hilda Jimenez","drinks":["Latte","Macchiato","Espresso"]},
    {"id":9,"name":"Pauline Roberson","drinks":["Espresso"]},
    {"id":10,"name":"Vanessa Barrett","drinks":["Flat White","Cappuccino","Latte"]}

    {
    "Cappuccino": {
      "coffee": 0.01,
      "water": 0.035,
      "milk": 0.09    0,206
    },
    "Espresso": {
      "coffee": 0.01,
      "water": 0.035  0,071
    },
    "Latte": {
      "coffee": 0.01,
      "water": 0.035,
      "milk": 0.135   0,274
    },
    "Flat White": {
      "coffee": 0.02,
      "water": 0.04,
      "milk": 0.11    0,277
    },
    "Macchiato": {
      "coffee": 0.01,
      "water": 0.035,
      "milk": 0.015   0,094
    }
  }

  {
    "coffee": 3.6,
    "water": 1,
    "milk": 1.5
  }

M = 0.1
Result: [{id: 4, name: "Don Parsons", drinks: ["Espresso"]}]

M = 0.25
Result: [
  {id: 4, name: "Don Parsons", drinks: ["Espresso"]},
  {id: 7, name: "Geraldine Carpenter", drinks: ["Espresso"]},
  {id: 9, name: "Pauline Roberson", drinks: ["Espresso"]}
]


*/

/*first of all fetch data from .json files*/

const getInviteList = (async (M) => {
  fetch("./employees.json")
    .then((response) => response.json())
    .then((dataEmployees) =>
      fetch("./recipes.json")
        .then((response) => response.json())
        .then((dataRecipes) =>
          fetch("./prices.json")
            .then((response) => response.json())
            .then((dataPrices) => {
              /*define names for drinks, ingredients and clculate price for each drink.
              Finaly form array with drinks objects that containes price field */

              const drinksNamesList = [...Object.keys(dataRecipes)];

              const recipesNamesList = [...Object.keys(dataPrices)];

              const drinksPrices = [];

              drinksNamesList.forEach((drink) => {
                let price = 0;
              
              /* final price for drink is multiplication of nominal ingredient price and required amount of each ingredient */
                recipesNamesList.forEach((ingr) => {
                  if (dataRecipes[drink][ingr]) {
                    price += dataRecipes[drink][ingr] * dataPrices[ingr];
                  }
                });

              /* format final price value */

                price = new Intl.NumberFormat("ru-Ru", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                }).format(price).replace(',','.');

                price = Number.parseFloat(price)
              
              /* form final array with drinks names and their prices */
                drinksPrices.push({ name: drink, price });
              });
              
              // define algorithm to achieve as many employees as possible with our budget: //
              // order drinks by ascending price
              // if we want to invite as many employees as possible so we should define how many
              // drinks with the lowest price we can order
              // if this number will be greater than employees amount so we can invite all empoleyees who prefer 
              // this drink
              // if numder of cheappest drink less than employees amout so we invite only those guys that prefer this
              // drink one by one from the beginning of our employees list
              // if we have a lot of money so we can allow to invite those guys who prefer more expensive drinks
              // so we should extract from our budget summary of the cheapest drink for each employee
              // take another drink , one of the cheappest from our list , and repeat previous steps
              // but if employy also prefer another drink that is more expensive we should skip him 
              // because he is already in our invite list and in order to invite all employees we should count on chepest drink types
              // repeat all instructions before we get invite list with all employees or we spent all budget money 

              // order drinks by ascending price

              const sortedDrinks = drinksPrices.sort((a,b) => {
                if (a.price > b.price) {
                  return 1
                }
                if (a.price < b.price) {
                  return -1
                }

                return 0
              })

              const inviteList = []

              let idx = 0
              let rest = 0
              let remainder = M

              while (idx < sortedDrinks.length && remainder > 0) {

              let amount = Math.floor(M / sortedDrinks[idx].price)

              dataEmployees.forEach(empl => {
                if (amount > 0 && (amount - rest) >= 1) {
                  if (!inviteList.find((invited) => empl.id === invited.id)) {
                    if (empl.drinks.includes(sortedDrinks[idx].name)) {
                      inviteList.push({...empl, drinks: [sortedDrinks[idx].name]})
                      rest++
                    }
                  }
                }
              })

              remainder = M - sortedDrinks[idx].price * inviteList.length

              idx++
              }

              console.log(inviteList)

            })
        )
    );
}
)(0.7)


