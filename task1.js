/*
Candy weighs X grams, pineapple - Y grams, and apple - Z grams.
Need to write a program that will determine 
how many different versions of tips weighing exactly W grams can make Santa Claus.

X = 10
Y = 15
Z = 25
W = 40

Result = 3

Answer:

Question is to write how many different versions of tips weighing exactly W grams can make Santa?
Based on this set of :candy, pineapple and apple,  we can form 4 different types of tips. If we change sequence of items 
nothing will change because we will have the same amout and the same type in our tip set. So the maximum amount of differnt 
versions is 4 and function need to consequently check weight summary of which version and compare to required summary.
Simenteniously on each iteration increment versions counter if version summary less than required.
*/

const versionsCalculator = (X,Y,Z,W) => {
    let counter = 0;

    const v1 = X + Y
    const v2 = X + Z
    const v3 = Y + Z
    const v4 = X + Y + Z

    if (v1 <= W) counter++
    if (v2 <= W) counter++
    if (v3 <= W) counter++
    if (v4 <= W) counter++

    return counter
}

console.log(versionsCalculator(100,15,25,50))