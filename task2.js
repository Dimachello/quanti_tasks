/*
Jimny, our secretary, went to the office late today, and it is urgently necessary to save time to have dinner,
but before she needs N copies of the same document. 
There are two Xerox, one of which copies the list of paper for x seconds, and the other one - for y seconds. 
(You may use one Xerox machine, or both at the same time. You can not only copy from the original but also use a copy.) 
To help her to find out what is the minimum time it will take.

Input data
The function should receive three integers: N, x and y

Output data
The function should return a single number - the minimum time in seconds required for the preparation of N copies.

Example1: 
N = 4
x = 1
y = 1
Result: 3

Example2: 
N = 5
x = 1
y = 2
Result: 4

Answer:
First of all we should make a 1 copy of the document by Xerox that takes minimin amount of time after this we will have
original document and copy of it so we can start to use 2 Xeroxes at the same time.
*/

const timeCalculator = (N, x, y) => {
    let timer = 0;
    let copies = 0;
    let slow;
    let fast;
    let equal;
    let difference = 0;
    let speedComparator = (() => {
        if(x < y) {
            fast = x
            slow = y
            difference = y - x
            return
        } 
        if(y < x) {
            fast = y
            slow = x
            difference = x - y
            return
        }
        if (x === y) {
            fast = x
            slow = x
            equal = true
            return 
        }
    /* if first xerox faster so return him, if not - return second machine, if time is equal doesn`t matter which
    one should be returned*/
    })()

    timer+=fast
    copies++

    /*now we have original document and a copy of it so we can start to use 2 Xeroxes at the same time */

    if(equal){
        while (copies <= N) {
            timer+=fast
            copies+=2
        }
    /*if Xeroxes work with same speed, we have 2 copies of document at the same period of time*/
    } else {
        while (copies < N) {
            if (N * fast <= slow){
                timer+=fast
                copies+=1
            } else {
                if ((N - copies) === 1){
                    timer+=fast
                    copies+=1
                } else {
                    timer+=slow
                    copies+= Math.floor(slow/fast) + 1
                }
            }
        }
    /*if period of time that is spend on faster Xerox for required amount of copies less or equal to time of slow 
    Xerox print for one list there is no need to use second Xerox*/

    /*if remaining copies amout equal 1 we use faster Xerox only*/
    }

    return timer
}

console.log(timeCalculator(5,3,2))
