const axios= require('axios')
const { throws } = require("assert")

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data 
  }

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data 
  }


                        //1st function
const listShareholders= async function listShareholders(stockName){
    let obj={}
    if(!stockName || typeof stockName!== "string" || stockName.trim().length==0 ){
        throw 'Invalid Input'
    }
    else{
        let people1= await getPeople()
        let stocks1 = await getStocks()
        let c=0
        let res
        let ns

        stocks1.forEach(element => {
            if(element.stock_name===stockName){
                element.shareholders.forEach(x=>{
                    people1.forEach(y=>{
                        if(x.userId==y.id){
                            c+=1
                            delete x.userId
                            ns=x.number_of_shares
                            delete x.number_of_shares
                            x["first_name"]=y.first_name
                            x["last_name"]=y.last_name
                            x["number_of_shares"]=ns
                        }
                    })
                    if(c==0){
                        delete x.userId
                        delete x.number_of_shares
                    }
                })
                res=element
            }
        });
        if(!res){
            throw 'stock name cannot be found'
        }
        return res

    }
}


                //2nd Function
const totalShares=async function totalShares(stockName){
    if(!stockName){
        throw 'Provide name of the stock'
    }
    else if (typeof stockName!== "string" ){
        throw 'Stock name should be string'
    }
    else if (stockName.trim().length==0){
        throw 'Stock name can not be an empty space'
    }
    else{
        let stocks1 = await getStocks()
        let sh=0
        let total=0
        let count=0

        stocks1.forEach(element => {
            if(element.stock_name===stockName){
                if((element.shareholders).length !==0){
                    sh=Object.keys(element.shareholders).length
                    total=(element.shareholders).map(x=>x.number_of_shares).reduce((a,b)=>a+b)
                }
                count+=1
            }
            
        })
        if(sh==1){
            return `${stockName}, has ${sh} shareholder that owns a total of ${total} shares.`
        }
        else if (count==1 && sh==0){
            return `${stockName} currently has no shareholders.`
        }
        else if(count==0){
            throw 'No stock with that name'
        }
        return `${stockName}, has ${sh} shareholders that own a total of ${total} shares.`
    }
}



                //3rd Function
const listStocks=async function listStocks(firstName, lastName){
    if(!firstName || !lastName ){
        throw 'Provide Firstname and Lastname '
    }
    else if(typeof firstName!== 'string' || typeof lastName!== 'string'){
        throw 'Firstname and Lastname should be a string'
    }
    else if(firstName.trim().length==0 || lastName.trim().length==0){
        throw 'Firstname and Lastname can not be an empty space'
    }
    else{
        let people1= await getPeople()
        let stocks1 = await getStocks()
        let res=[]
        let t=0

        people1.forEach(p=>{
            if(p.first_name===firstName && p.last_name===lastName){
                stocks1.forEach(s=>{
                    s.shareholders.forEach(h => {
                        if(h.userId===p.id){
                            let r={}
                            r['stock_name']=s.stock_name
                            r['number_of_shares']=h.number_of_shares
                            res.push(r)
                        }
                    });
                })
                t+=1
            }
        })
        if(t==0){
            throw `${firstName} ${lastName} is not in people.json`
        }
        if(!res){
            throw 'Person does not own any shares'
        }
        return res
    }
}



                //4th Function
const getStockById=async function getStockById(id){
    if(!id){
        throw 'ID not provided'
    }
    else if(typeof id!=='string') {
        throw 'ID should be string'
    }
    else if(id.trim().length==0){
        throw 'ID can not be an empty space'
    }
    else{
        let stocks2= await getStocks()
        let stock

        stocks2.forEach(element => {
            if(element.id=== id){
                stock=element
            }
        });
        if(!stock){
            throw 'stock not found'
        }
        return stock
    }
}






module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}