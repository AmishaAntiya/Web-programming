const axios= require('axios')


async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    return data 
  }

async function getCompanies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    return data 
}


const getPersonById = async function getPersonById(id){
    if(!id){
        throw 'ID is not provided'
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

const getAllP = async function getAllP() {
    let peopleList = await getPeople()
    return peopleList
}

const getAllW = async function getAllW() {
    let companiesList = await getCompanies()
    return companiesList
}

const getCompanyById = async function getCompanyById(id){
    if(!id){
        throw 'ID is not provided'
    }
    
    

    let ans={}
    let company1= await getCompanies()
    let c=0

    company1.forEach(element => {
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
        throw 'Company not found'
    }
    return ans 
    
}

module.exports={
    getPersonById,
    getAllP,
    getAllW,
    getCompanyById
}