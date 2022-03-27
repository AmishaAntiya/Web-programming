const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
// const { albums } = require('.');


    const errorHandling = async (name, genre, website, recordLabel, bandMembers, yearFormed)=>{
        if(!name || !genre || !website || !recordLabel || !bandMembers || !yearFormed) throw 'Fields can not be empty'
        
        if(typeof name !== 'string') throw 'Name needs to be a string'
        if(typeof website !== 'string')  throw 'Website needs to be a string'
        if(typeof recordLabel !== 'string') throw 'recordLabel needs to be a string'
        if(name.trim().length ==0 ) throw 'Name can not be an empty string'
        if(website.trim().length == 0 ) throw 'Website can not be an empty string'
        if(recordLabel.trim().length == 0) throw 'recordLabel can not be an empty string'

        if (website.startsWith("http://www.") == false || website.endsWith(".com") == false || website.length < 20 ) throw 'Invalid website'
        if(Array.isArray(genre) == false || Array.isArray(bandMembers) == false) throw 'Invalid Input for genre and band mamber'
        if(typeof yearFormed !== 'number') throw 'Year the band was formed should be a number'
        if (yearFormed<1900 || yearFormed>2022) throw 'Invalid input for year the band was formed'


        if(genre.length ==0) throw 'Genre can not be empty'
        genre.forEach(element => { 
            if(typeof element !== 'string' ) throw 'Genre should only be array of string'
            else if(element.trim().length ==0) throw 'Genre can not have empty element'
        });

        if(bandMembers.length ==0) throw 'Band members can not be empty'
        bandMembers.forEach(element => { 
            if(typeof element !== 'string') throw 'band member should only be array of string'
            else if(element.trim().length ==0) throw 'band memeber can not have empty element'
        });
    }
    const idCheck= async (id)=>{
        if(!id) throw 'Provide valid Id to search for band'
        if(typeof id !== 'string') throw 'Id should be a string'
        if (id.trim().length===0) throw 'Id can not be empty'
        id=id.trim()

        if(!ObjectId.isValid(id)) throw 'Invalid object id'
    }
    const create= async (name, genre, website, recordLabel, bandMembers, yearFormed)=>{
        await errorHandling(name, genre, website, recordLabel, bandMembers, yearFormed)
        name=name.trim()
        website=website.trim()
        recordLabel=recordLabel.trim()

        const bandCollection= await bands();

        let newBand={
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: [],
            overallRating: 0
        }

        const insertband = await bandCollection.insertOne(newBand);
        if (insertband.insertedCount === 0) throw {code: 500, error: `Could not add band`}
        
        let newBandId= insertband.insertedId.toString()
        let band = await this.get(newBandId)

       band._id=band._id.toString()

        return band;
    }

    const get = async (id) => {
        await idCheck(id)

        const bandCollection= await bands();
        const bandById= await bandCollection.findOne({_id: ObjectId(id)})

        if(bandById == null) throw {code:404, error: `No such band with id ${id}`}
        bandById._id=bandById._id.toString()
        return bandById
    }

    const getAll= async ()=>{
        const bandCollection= await bands();
        const bandList = await bandCollection.find({}).toArray();
        console.log(bandList)

        if(bandList.length === 0) throw {code: 404, error: `No bands in the database`}
        bandList.forEach(element=>element._id=element._id.toString())
        return bandList;
    }

    const remove = async (id)=>{
        await idCheck(id)

        const bandCollection= await bands();
        const bandById= await bandCollection.findOne({_id: ObjectId(id)})
        if(bandById == null) throw {code:404, error: `No such band with id ${id}`}

        const deletedBand= await bandCollection.deleteOne({_id: ObjectId(id)})
        if(!deletedBand) throw {code: 500, error: `Could not delete the band with id ${id}`}
        return {bandId: id, deleted: true}
    }

    const update = async (id, name, genre, website, recordLabel, bandMembers, yearFormed)=>{
        await idCheck(id)
        await errorHandling(name, genre, website, recordLabel, bandMembers, yearFormed)
        
        const bandCollection= await bands();
        const bandById= await bandCollection.findOne({_id: ObjectId(id)})
        if(bandById == null) throw {code:404, error: `No such band with id ${id}`}

        let overallRating=bandById.overallRating
        let albums=bandById.albums

        let updatedBand={
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            albums: albums,
            overallRating: overallRating
        }
        id=ObjectId(id);
        const updatedInfo = await bandCollection.updateOne(
            { _id: id },
            { $set: updatedBand }
          );

        if(!updatedInfo.matchedCount && !updatedInfo.modifiedCount) throw {code: 500, error: `band can not be updated`}

        let updateInfo= await bandCollection.findOne({_id: id})
        updateInfo._id=updateInfo._id.toString()
        return updateInfo
    }

module.exports={
    create,
    get,
    getAll,
    remove,
    update
}