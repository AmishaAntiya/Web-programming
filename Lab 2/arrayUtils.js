                    //1st function to find mean value of elements of an array
const mean=function mean(array){
    //error handling
    if(!array || array.length==0 || Array.isArray(array)==false){
        throw 'Invalid Input'
    }
    else{
        let sum=0,count=0;
        //to check whether every element of array is number and then calculate mean
        array.forEach(element => {
            //error handling
            if(typeof element !== 'number' || element.length==0){
                throw 'Invalid Input'
            }
            else{
                sum+=element
                count+=1
            }
        })
        return (sum/count)
    }
}

                    //2nd function to calculate median value of the elements of an array squared
const medianSquared= function medianSquared(array){
    //error handling
    if(!array || array.length==0 || Array.isArray(array)==false){
        throw 'Invalid Input'
    }
    else{
        //to check each element of an array is number or not
        array.forEach(element => {
            if(typeof element !== 'number' || element.length==0){
                throw 'Invalid Input'
            }
        })
    }
    //to sort the array
    const sortedArr=array.sort(function(a,b){
        return a-b
    })
    let med
    //finding median of array having odd number of elements
    if (sortedArr.length %2 !=0){
        let position= ((sortedArr.length)+1)/2
        med=sortedArr[position-1]  
    }
    //finding median of array having even number of elements
    else{
        let l,r
        l=sortedArr.length/2
        r=l+1
        let p=sortedArr[l-1]+sortedArr[r-1]
        med=p/2
    }
    return (med ** 2)
}

                //3rd function  to find the largest element in array and return that value and index of that element in object form
const maxElement= function maxElement(array){
    //error handling
    if(!array || array.length==0 || Array.isArray(array)==false){
        throw 'Invalid Input'
    }
    else{
        //to check each element of an array is number or not
        array.forEach(element => {
            if(typeof element !== 'number' || element.length==0){
                throw 'Invalid Input'
            }
        })
    }
    //initialize an empty object
    var obj={}

    //to find the maximum element in an array
    var max=array.reduce(function(a,b){
        return Math.max(a,b)
    })

    //to get the index of first occurence of max element
    var index=array.indexOf(max)
    obj[max]=index
    return obj
}

                    //4th function to create a new numbered array starting at 0 increasing by one up to, but not including the end argument
const fill= function fill(end, value){
    //error handling
    if(!end || typeof end != "number" || end<=0){
        throw 'Invalid Input'
    }
    //Initialize new array
    let arr=[]
    //if value is not passed then it will return starting with 0 till end
    if(!value){
        for(let i=end;i>0;i--){
            arr.push(end-i)
        }
        return arr
    }
    //if value is given fill the array by value till the value of end 
    else{
        arr=Array(end).fill(value,0)
        return arr
    }
}

                    //5th function to return an object with the count of each element that is repeating in the array
const countRepeating= function countRepeating(array){
    var obj={}
    let count=0
    //error handling
    if(!array || Array.isArray(array)==false){
        throw 'Invalid Input'
    } 
    //empty array
    else if (array.length==0){
        return obj
    }
    else{
        //iterate over the length of array
        for(let i=0;i<array.length;i++){
            //iterate over the length of array to check for the match throughout the array
            for(let j=0;j<array.length;j++){
                //if the same element is found increase the counter value
                if(array[i]==array[j]){
                    count+=1
                }
            }
            //if counter value is at least 2 that means the element is repeated
            if(count>=2){
                //insert the element and count as key-value pair in object
                obj[array[i]]=count
            }
            //intialize the counter to 0 to count for the next element
            count=0
        }
        return obj
    }
}

                    //6th function to check if they are equal in terms of size and elements
const isEqual=function isEqual(arrayOne, arrayTwo){
    if(!arrayOne || !arrayTwo || Array.isArray(arrayOne)==false || Array.isArray(arrayTwo)==false){
        throw 'Invalid Input'
    } 
    else{
        //both array is of same size
        if(arrayOne.length == arrayTwo.length){
            //when both array are having number elements
            if(arrayOne.every(function(e){return typeof e ==='number'})==true 
            && arrayTwo.every(function(e){return typeof e ==='number'})==true){
                arrayOne.sort(function(a,b){ return a-b})
                arrayTwo.sort(function(a,b){ return a-b})
                return (arrayOne + "" ==arrayTwo + "")
            }
            //when both array are having string elements
            else if(arrayOne.every(function(e){return typeof e ==='string'})==true 
            && arrayTwo.every(function(e){return typeof e ==='string'})==true){
                arrayOne.sort()
                arrayTwo.sort()
                return (arrayOne + "" ==arrayTwo + "")
            }
            //when both array are having array as element
            else if(arrayOne.every(function(e){return Array.isArray(e)})==true 
            && arrayTwo.every(function(e){return Array.isArray(e)})==true){
                arrayOne.forEach((e)=>{e.sort(function(a, b) {return a - b})})
                arrayTwo.forEach((e)=>{e.sort(function(a, b) {return a - b})})
                return (arrayOne + "" ==arrayTwo + "")
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}
