                //1st function to return an array of arrays where an array of each key and value is an element in the array. 
const makeArrays= function makeArrays(objects){
    if (!objects || Array.isArray(objects)==false || objects.length==0 || objects.length<2){
        throw 'Invalid Input'
    }
    else{
        let arr=[]
        //to iterate over object
        for(let i=0;i<objects.length;i++){
            for (k in objects[i]){
                //insert each key value pair to arr
                arr.push([k,objects[i][k]])
            }
        }
        return arr
    }
}


                //2nd function to checks each field (at every level deep) in obj1 and obj2 for equality
const isDeepEqual= function isDeepEqual(obj1, obj2){
    //error handling
    if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object" || Array.isArray(obj1)==true || Array.isArray(obj2)==true){
        throw 'Invalid Input'
    }
    else{
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        //check the length of array having key values of each object
        if (keys1.length === keys2.length) {
            //iterate over the array of keys
            for (let key of keys1) {
                //if the value of corresponding key is in object form
                if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
                    let o1=obj1[key]
                    let o2=obj2[key]
                    //recursion to find the equality of value which is in the form of object
                    return (isDeepEqual(o1,o2))
                }
                //if values are not equal
                else if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
        }
        //returns false if both the array of keys are of different size
        else{
            return false
        }
        return true;
    }
}


                    //3rd function to evaluate the function on the values of the object and return a new object with the results
const computeObject=function computeObject(object, func){
    //error handling
    if (!object || !func || typeof object !== "object" || typeof func !== "function" ) {
        throw "Error Invalid Inputs"
    }
    //To check whether the value is in number form
    for(let key in object){
        if(typeof (object[key]) !== 'number'){
            throw 'Invalid Inputs'
        }
    }
    //to change the value of each key value pair in object
    Object.keys(object).forEach(key=>{
        object[key]=func(object[key])
    })
    return object
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}