const questionOne = function questionOne(arr) {
    let mySquaredArray=arr.map(element=> element**2);
    let sum=(previousValue,currentValue) => previousValue + currentValue;
    return(mySquaredArray.reduce(sum));
}

const questionTwo = function questionTwo(index) { 
    let a=0,b=1,c
    if (index==0 || index<1){
        return(a);
    }
    else if (index==1) {
        return(b);
    } 
    else {
        for(let i=2;i<index+1;i++){
            c=a+b;
            a=b
            b=c
         }
         return(c);
    }
}

const questionThree = function questionThree(str) {
    let count=0;
    let str1=str.toLowerCase();
    for(let i=0;i<str1.length+1;i++){
        if(str1.charAt(i)=='a' || str1.charAt(i)=='e' || 
        str1.charAt(i)=='i' || str1.charAt(i)=='o' || str1.charAt(i)=='u'){
            count++;
        }
    }
    return(count);
}


const questionFour = function questionFour(num) {
    if(num<0){
        return('NaN');
    }
    else if(num==0 || num==1){
        return(1);
    }
    else{
        return (num*questionFour(num-1));
    }
}

module.exports = {
    firstName: "AMISHA", 
    lastName: "A", 
    studentId: "",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
