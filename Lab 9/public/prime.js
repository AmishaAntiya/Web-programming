
const prime=(number)=>{
    if(!number) throw 'Provide a number'
    if(number==1 ) throw '1 is neither prime nor composite number'
    if(number==0) throw '0 is neither prime nor composite number'
    if(number<0) throw 'Provide whole number'
    if(number%1 !==0) throw 'Invalid Input'
    let isPrime=true
    for(let i=2;i<number;i++){
        if(number%i==0) {
            isPrime=false
            break
        }
        else {
            isPrime=true
        }
    }
    if(isPrime) return true
    return false
}

const myForm = document.getElementById("primeForm")
const input = document.getElementById("numberInput")
const ulDiv = document.getElementById("primeAttempts")
const ul = document.getElementById("attempts")
const errorDiv = document.getElementById("errorDiv")

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try{
        input.classList.remove("errorsExists")
        errorDiv.classList.add("hidden")

        let inputValue=input.value
        //let primeNode=parseInt(inputValue)
        
        let isPrime=prime(inputValue)
        ulDiv.className="primeAttempts"
        input.value=""

        let li=document.createElement('li');
        li.append(inputValue)
        if(isPrime){
            li.className="is-prime"
            li.append(" is a prime number")
        }else{
            li.className="not-prime"
            li.append(" is NOT a prime number")
        }

        ul.insertBefore(li, ul.childNodes[0]);
    }
    catch(e){
        errorDiv.textContent = e
        errorDiv.classList.remove("hidden")
        input.classList.add("errorsExists")
    }
});
