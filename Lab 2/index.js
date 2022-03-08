const array = require("./arrayUtils");
const string = require("./stringUtils");
const object = require("./objUtils");

// Mean Tests
try {
    // Should Pass
    const meanOne = array.mean([2, 3, 4]);
    console.log(meanOne);  //return 3
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    const meanTwo = array.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');// error as argument is not an array
 }

 //mediansquared
 try {
    // Should Pass
    const m1 = array.medianSquared([1, 2, 4, 5]) ;;
    console.log(m1); // returns 4
 } catch (e) {
    console.error('Median failed test case');
 }
 try {
    // Should Fail
    const m2 = array.medianSquared();
    console.error('Median did not error');
 } catch (e) {
    console.log('Median failed successfully');//error as no argument is passed
 }

 //maxElement
 try {
    // Should Pass
    const m1 = array.maxElement([5, 6, 7]);
    console.log(m1); //return {'7': 2}
 } catch (e) {
    console.error('Max failed test case');
 }
 try {
    // Should Fail
    const m2 = array.maxElement("test");
    console.error('Max did not error');
 } catch (e) {
    console.log('Max failed successfully');// error as argument is not an array
 }
 
 //fill
 try {
   // Should Pass
   const m1 = array.fill(3, 'Welcome'); 
   console.log(m1); // Returns: ['Welcome', 'Welcome', 'Welcome']);
} catch (e) {
   console.error('Fill failed test case');
}
 try {
    // Should Fail
    const m2 = array.fill("test"); 
    console.error('Fill did not error');
 } catch (e) {
    console.log('Fill failed successfully');// error as argument is not a number
 }

 //countRepeating
 try {
    // Should Pass
    const m1 = array.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log(m1);  //returns { '7': 2, true: 3, Hello: 2 }
 } catch (e) {
    console.error('Count failed test case');
 }
 try {
    // Should Fail
    const m2 = array.countRepeating("foobar") 
    console.error('Count did not error');
 } catch (e) {
    console.log('Count failed successfully'); //error as argument is not an array
 }

 //isEqual
 try {
    // Should Pass
    const m1 = array.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log(m1);   //  Returns: true
 } catch (e) {
    console.error('Equal failed test case');
 }
 try {
    // Should Fail
    const m2 = array.isEqual([1, 3, 2], [1, 2, 3, 4]);
    console.error(m2);   // Returns: false
 } catch (e) {
    console.log('Equal failed successfully'); 
 }

 //camelCase
 try {
    // Should Pass
    const m1 = string.camelCase('my function rocks');
    console.log(m1);    // Returns: "myFunctionRocks"
 } catch (e) {
    console.error('Camel case failed test case');
 }
 try {
    // Should Fail
    const m2 = string.camelCase(123);
    console.error('Camel case did not error');
 } catch (e) {
    console.log('Camel case failed successfully');   // Error as argument is not a string
 }

 //replaceChar
 try {
    // Should Pass
    const m1 = string.replaceChar("Hello, How are you? I hope you are well"); 
    console.log(m1);       // Returns: "Hello, *ow are you? I $ope you are well"
 } catch (e) {
    console.error('Replace char failed test case');
 }
 try {
    // Should Fail
    const m2 = string.replaceChar(123);
    console.error('Replace char did not error');
 } catch (e) {
    console.log('Replace char failed successfully'); // Error as argument is not a string
 }

 //mashUp
 try {
    // Should Pass
    const m1 = string.mashUp("Patrick", "Hill");  
    console.log(m1);  //Returns "Hitrick Pall"
 } catch (e) {
    console.error('Mash up failed test case');
 }
 try {
    // Should Fail
    const m2 = string.mashUp ("h", "Hello")
    console.error('Mash up did not error');
 } catch (e) {
    console.log('Mash up failed successfully');  //Error as 1st argument string length is <2
 }

 //makeArrays
 try {
    // Should Pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const m1 = object.makeArrays([first, second, third]); 
    console.log(m1);  // returns [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
 } catch (e) {
    console.error('Make array failed test case');
 }
 try {
    // Should Fail
    const m2 =object.makeArrays([]);
    console.error('Make array did not error');
 } catch (e) {
    console.log('Make array failed successfully');  //Error as array is empty
 }

 //isDeepEqual
 try {
    // Should Pass
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    const m1 = object.isDeepEqual(forth, fifth);   
    console.log(m1);   // returns true
 } catch (e) {
    console.error('Deep equal failed test case');
 }
 try {
    // Should Fail
    const m2 = object.isDeepEqual("foo", "bar")
    console.error('Deep equal did not error');
 } catch (e) {
    console.log('Deep equal failed successfully');  //error as arguments are not object
 }

 //computeObject
 try {
    // Should Pass
    const m1 = object.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2)  
    console.log(m1);   //returns { a: 6, b: 14, c: 10 }
 } catch (e) {
    console.error('Compute obj failed test case');
 }
 try {
    // Should Fail
    const m2 = object.computeObject({ a: 'Hi', b: 7, c: 5 },n => n * 2 )
    console.error('Compute obj did not error');
 } catch (e) {
    console.log('Compute obj failed successfully'); //Error as the value in key-value pair of object is not a number
 }

