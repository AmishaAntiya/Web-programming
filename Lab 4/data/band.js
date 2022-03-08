const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

module.exports = {
    async create(name, genre, website, recordLabel, bandMembers, yearFormed){
        if(!name || !genre || !website || !recordLabel || !bandMembers || !yearFormed) throw 'All fields need to have valid values'
        if(typeof name !== 'string'|| typeof website !== 'string'|| typeof recordLabel !== 'string') throw 'Name, Website and recordLabel needs to be a string'
        if(name.trim().length ==0 || website.trim().length == 0 || recordLabel.trim().length == 0) throw 'Name, Website and recordLabel can not be an empty string'
        if (website.startsWith("http://www.") == false || website.endsWith(".com") == false || website.length < 20 ) throw 'Invalid website'
        if(Array.isArray(genre) == false || Array.isArray(bandMembers) == false) throw 'Invalid Input for genre and band mamber'
        if(typeof yearFormed !== 'number') throw 'Year the band was formed should be a number'
        if (yearFormed<1900 || yearFormed>2022) throw 'Invalid input for year the band was formed'
        if(genre.length ==0) throw 'Genre can not be empty'
        genre.forEach(element => { 
            if(typeof element !== 'string' ) throw 'Genre should only be array of string'
            else if(element.trim().length ==0) throw 'Genre can not have empty element'
        });
        if(bandMembers.length ==0) throw 'Band memebers can not be empty'
        bandMembers.forEach(element => { 
            if(typeof element !== 'string') throw 'band member should only be array of string'
            else if(element.trim().length ==0) throw 'band memeber can not have empty element'
        });

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
            yearFormed: yearFormed
        }

        const insertband = await bandCollection.insertOne(newBand);
        if (insertband.insertedCount === 0) throw 'Could not add band'
        
        let newBandId= insertband.insertedId.toString()
        let band = await this.get(newBandId)

       band._id=band._id.toString()

        return band;
    },

    async get(id){
        if(!id) throw 'Provide valid Id to search for band'
        if(typeof id !== 'string') throw 'Id should be a string'
        if (id.trim().length===0) throw 'Id can not be empty'
        id=id.trim()

        if(!ObjectId.isValid(id)) throw 'Invalid object id'
        const bandCollection= await bands();
        const bandById= await bandCollection.findOne({_id: ObjectId(id)})

        if (bandById == null) throw 'No band with that Id'

        bandById._id=bandById._id.toString()
        return bandById
    },

    async getAll(){
        const bandCollection= await bands();
        const bandList = await bandCollection.find({}).toArray();
        bandList.forEach(element=>element._id=element._id.toString())
        return bandList;
    },

    async remove(id){
        if(!id) throw 'Provide valid Id to search for band'
        if(typeof id !== 'string') throw 'Id should be a string'
        if (id.trim().length===0) throw 'Id can not be empty'
        id=id.trim()

        if(!ObjectId.isValid(id)) throw 'Invalid object id'
        const bandCollection= await bands();
        const bandById= await bandCollection.findOne({_id: ObjectId(id)})

        if(!bandById) throw 'No such band exists'
        const deletedBand= await bandCollection.deleteOne({_id: ObjectId(id)})
        if(!deletedBand) throw `Could not delete the band with id ${id}`
        return `${bandById.name} has been successfully deleted!`
    },

    async rename(id, newName){
        if(!id) throw 'Provide valid Id to search for band'
        if(typeof id !== 'string') throw 'Id should be a string'
        if (id.trim().length==0) throw 'Id can not be empty'
        id=id.trim()

        if(!ObjectId.isValid(id)) throw 'Invalid object id'

        if(!newName) throw 'Provide new name to rename the band'
        if(typeof newName !== 'string') throw 'New name should be a string'
        if(newName.trim().length ==0 ) throw 'New name can not be empty'

        const bandCollection= await bands();
        const bandById= await bandCollection.findOne({_id: ObjectId(id)})
        if(!bandById) throw `No such band with id ${id}`
        if(newName == bandById.name) throw 'New name is same as of previous name'

        const updatedName={
            name:newName
        }
        const updatedInfo = await bandCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: updatedName }
          );
        if(!updatedInfo) throw 'Band can not be updated'
        let res=await bandCollection.findOne({_id: ObjectId(id)})
        res._id=res._id.toString()
        return res;

    }
}
