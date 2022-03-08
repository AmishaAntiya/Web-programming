const people = require("./people");
const stocks= require("./stocks");


async function main(){
    try{
        const personById = await people.getPersonById ("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log (personById);
    }catch(e){
        console.log (e);
    }
    try{
        const sEmail = await people.sameEmail("HARVARD.EDU");
        console.log (sEmail);
    }catch(e){
        console.log (e);
    }
    try{
        const mIP = await people.manipulateIp();
        console.log (mIP);
    }catch(e){
        console.log (e);
    }
    try{
        const sameDOB = await people.sameBirthday("09", "25");
        console.log (sameDOB);
    }catch(e){
        console.log (e);
    }
    try{
        const shareH = await stocks.listShareholders("Aeglea BioTherapeutics, Inc.")
        console.log (shareH);
    }catch(e){
        console.log (e);
    }
    try{
        const totalS = await stocks.totalShares('Aeglea BioTherapeutics, Inc.');
        console.log (totalS);
    }catch(e){
        console.log (e);
    }
    try{
        const listS = await stocks.listStocks("Grenville", "Pawelke" )
        console.log (listS);
    }catch(e){
        console.log (e);
    }
    try{
        const getById = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (getById);
    }catch(e){
        console.log (e);
    }
}


//call main
main();