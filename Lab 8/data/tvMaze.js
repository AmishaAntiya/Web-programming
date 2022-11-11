const axios = require('axios');
const mazeUrl = "http://api.tvmaze.com/search/shows?q=";
const showUrl = "http://api.tvmaze.com/shows/";

async function getMaze(showData){
    let link=mazeUrl+showData
    const {data}= await axios.get(link)
    return data;
}

async function getShow(id){
    let link=showUrl+id
    const {data}= await axios.get(link)
    return data;
}

const getSearchShow=async function getSearchShow(showData){
    if(!showData) throw 'showSearchTerm not provided'
    if(typeof showData !== 'string') throw 'Provided showSearchTerm is not a string'
    if(showData.trim().length==0) throw 'Invalid showSearchTerm'
    try{
        let res=await getMaze(showData);
        if(!res || res.length==0) throw 'Show Not Found'
        res=res.slice(0,5)
        return res
    }catch(e){
        throw e;
    }

}
const getShowById=async function getShowById(id){
    id=id.trim()
    if(!id || id.trim().length==0 || isNaN(parseInt(id))){
        throw 'Invalid Id'
    }
    try{
        let res=await getShow(id)
        if(!res || res.length==0) throw 'Show Not Found'
        let exp = /(<([^>]+)>)/ig;
        res.summary = res.summary.replace(exp, "");
        return res;
    }catch(e){
        throw e;
    }
}
module.exports ={
    getSearchShow,
    getShowById
};