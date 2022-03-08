const axios= require('axios')
const { throws } = require("assert")

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data 
  }


                    //1st Function
const getPersonById = async function getPersonById(id){
    if(!id){
        throw 'ID is not provided'
    }
    else if (typeof id!=='string' ){
        throw 'Provided ID is not a string '
    }
    else if(id.trim().length===0 || id.length ===0){
        throw 'ID can not be an empty spaces'
    }

    let ans={}
    let people1= await getPeople()
    let c=0

    people1.forEach(element => {
        for(let i in element){
            if(i==='id'){
                if(element[i]===id){
                    ans=element
                    c+=1
                }
            }
        }
    });
    if(c===0){
        throw 'Person not found'
    }
    return ans 
}


                     //2nd function
const sameEmail=async function sameEmail(emailDomain){
    if(!emailDomain){
        throw 'email domain not provided'
    }
    else if(typeof emailDomain!== 'string'){
        throw 'email domain is not a string'
    }
    else if(emailDomain.trim().length==0 || emailDomain.length==0){
        throw 'email domain can not be empty'
    }
    else if(emailDomain.includes('.')===false){
        throw 'email domain should contain dot'
    }
    else if(emailDomain.slice(emailDomain.lastIndexOf(".")).length<2 || (/^[a-zA-Z]+$/).test(emailDomain.slice(emailDomain.lastIndexOf(".")+1))===false ){ 
        throw 'email domain should have at least 2 letters after dot'
    }
    else if(emailDomain.slice(0,emailDomain.lastIndexOf(".")).length<2){
        throw 'email domain should have domain'
    }
    else{
        let ans=[]
        let people2=await getPeople()
        let email=emailDomain.toLowerCase()
        let regex=new RegExp('[a-z0-9]'+email)
        people2.forEach(element=>{
            for(let i in element){
                if(i==='email'){
                    if(element[i].endsWith(email)===true){
                        ans.push(element)
                    }
                }
            }
        })
        if(ans.length<2){
            throw 'No two people are having same email'
        }
        return ans
    }
}


                    //3rd Function
const manipulateIp=async function manipulateIp(){
    let people3=await getPeople()
    let sortIP={}
    let high=0
    let total=0
    let max={}
    let min1={}
    let res={}
    let minA=[]

    people3.forEach(element=>{
         sortIP[element.ip_address]=Number(element.ip_address.replaceAll('.','').split('').map(Number).sort((a,b)=>a-b).join(''))
         total+=sortIP[element.ip_address]
         if(sortIP[element.ip_address]>high){
             high=sortIP[element.ip_address]
             max['firstName']=element.first_name
             max['lastName']=element.last_name
             res['highest']=max
         }
         minA.push(sortIP[element.ip_address])
         min=Math.min(...minA)
    })
    for (let i in sortIP){
        if(sortIP[i]==min){
            people3.forEach(element=>{
                if(element.ip_address == i){
                    min1['firstName']=element.first_name
                    min1['lastName']=element.last_name
                    res['lowest']=min1
                }
            })
        }
    }
    let avg=Math.floor(total/Object.keys(sortIP).length)
    res['average']=avg
    return res
}

                        //4th Function
const sameBirthday=async function sameBirthday(month, day){
    if(!month || !day){
        throw 'Month and Day can not be empty'
    }
    else if(typeof month === "string"){
        if(month.trim().length===0){
            throw 'Month can not be an empty space'
        }
        month=Number(month)
        if(isNaN(month) || Number.isInteger(month)=== false){
            throw 'Month is not valid'
        }
    }
    else if(typeof day=== "string"){
        if(day.trim().length===0){
            throw 'Day can not be an empty space'
        }
        day=Number(day)
        if(isNaN(day) || Number.isInteger(day)=== false){
            throw 'Day is not valid'
        }
    }
    else if(typeof month !== 'number' || typeof day !== 'number'){
        throw 'Month and Day should be a number'
    }
    if(month >12 || month <1){
        if(month>12){
            throw 'Month > 12'
        }
        else if(month<1){
            throw 'Month < 1'
        }

    }
    else if(month==2 || month==02){
        if (day>=29){
            throw 'There are not 29 days in Feb'
        }
    }
    else if(month == 01 || month == 1 || month == 03 ||month == 3 || month == 05 || month == 5 
        || month == 07 || month == 7 || month == 08 || month == 8 || month == 10 || month == 12){
            if(day>31){
                let m=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
                throw `There are not ${day} days in ${m[month-1]}`
            }
    }
    else if(month == 4 || month ==04 || month ==6 || month == 06 || month==9 || month ==09 || month ==11){
        if(day>30){
            let m=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            throw `There are not ${day} days in ${m[month-1]}`
        }
    }

    let people4=await getPeople()
    let res=[]
    people4.forEach(element=>{
        let d=element.date_of_birth.split('/')
        d.pop()
        if(d[0]== month && d[1]== day){
            res.push(element.first_name+' '+element.last_name)
        }

    })
    if(!res){
        throw 'There are no people with that birthday'
    }
    return res

}

module.exports = {
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday
}


