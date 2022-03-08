                    //1st function to construct a camel case version of the string
const camelCase= function camelCase(string){
    //error handling
    if(!string || string.length==0 || typeof string !== "string" || string.trim().length==0){
        throw 'Invalid Input'
    }
    else{
        let stringArray;
        let finalString;
        //check for blank space in the string
        if (string.indexOf(" ") !=-1){
            //Split every word of string separated by blank space and store it in array
            stringArray=string.split(" ")
            //convert the fisrt word to lowercase 
            stringArray[0]=stringArray[0].toLowerCase()
            //iterate over other words in array to capitalize the first character and to lower case other characters
            for (let i=1;i<stringArray.length;i++){
                    stringArray[i]=stringArray[i].slice(0,1).toUpperCase() + stringArray[i].slice(1).toLowerCase()
            }
            //Join each value of array to make a string
            finalString= stringArray.join('')
        }
        //if there is no space in string
        else{
            finalString=string.toLowerCase()
        }
        return finalString
    }
}



                    //2nd function to replace any characters in the string  that are the same as the starting character but appear after the starting character (so not including the starting character) with alternating * and $ characters. 
const replaceChar= function replaceChar(string){
    //error handling
    if(!string || string.length==0 || typeof string !== "string" || string.trim().length==0){
        throw 'Invalid Input'
    }
    else{
        let char,strl,c
        //slice the string to get the first character of String
        char=string.slice(0,1)
        //convert the first charcater to lower case
        c=char.toLowerCase()
        //counter to keep track of occurance of first character
        count=0
        //Iterate over a string starting from 2nd character
        for(let i=1;i<string.length;i++){
            //check the character at index i and compare with first character
            if(string.charAt(i)==char || string.charAt(i)==c){
                //increase the counter if found the same character
                count+=1
                //if the count is odd number then replace that occurance with *
                if (count%2!=0){
                    string=string.substring(0,i)+"*"+string.substring(i+1)
                }
                //else replace it with $
                else{
                    string=string.substring(0,i)+"$"+string.substring(i+1)
                }
            }
        }
        return string
    }
}


                    //3rd function to concate two strings, separated by a space  and swapping of the first 2 characters of each. 
const mashUp= function mashUp(string1, string2){
    //error handling
    if(!string1 || !string2 || string1.length<2 || string2.length<2 || typeof string1 !== "string" || typeof string2 !== "string"  || string1.trim().length==0 || string2.trim().length==0){
        throw 'Invalid Input'
    }
    else{
        let str1,str2
        //Replace the first 2 chracter of string1 by first 2 character of string2
        str1=string2.substring(0,2)+string1.substring(2)
        //Replace the first 2 chracter of string2 by first 2 character of string1
        str2=string1.substring(0,2)+string2.substring(2)
        //concate both the new string separated by space
        return str1.concat(' ',str2)
    }
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}