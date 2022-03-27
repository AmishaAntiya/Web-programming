const mongoCollections = require('../config/mongoCollections');
const bands= mongoCollections.bands;
const bandFinal= require('./bands');
const albums = mongoCollections.albums;
const { ObjectId } = require('mongodb');



const errorHandling= async (title, releaseDate, tracks, rating)=>{
    if(!title || !releaseDate || !tracks) throw 'Fields can not be empty'
    if(!rating) throw 'rating can not be empty'
    if(typeof title !== 'string' || title.trim().length ==0 ) throw 'Title needs to be a non-empty string'
    if(typeof releaseDate !== 'string' || releaseDate.trim().length ==0) throw 'releaseDate should be non-empty string'
    if(Array.isArray(tracks) ==false) throw 'Invalid Input for tracks'
    if(tracks.length < 3) throw 'There should be at least 3 elements in tracks'
    tracks.forEach(element => { 
        if(typeof element !== 'string' ) throw 'Tracks should only be array of string'
        else if(element.trim().length ==0) throw 'Tracks can not have empty element'
    });
    let d=releaseDate.split('/')
      m=d[0]-1
      d=d[1]
      y=d[2]
    if(m>11 || m<0) throw 'Invalid release date'
    if(m ==0 || m==2 || m ==4 || m ==6 ||m ==7 || m ==9 || m==11){
        if(d>31 || d<1) throw 'Invalid release date'
    }
    if(m==3 || m ==5 || m ==8 || m ==10){
            if(d>30 || d<1) throw 'Invalid release date'
    }

    if(m==1){
        if(d>29 || d<1) throw 'Invalid release date'
    }
      
    if(y<1900 || y>2023)  throw 'Invalid year in releaseDate'
    if(typeof rating !== 'number') throw 'Invalid rating'
    let ratings=Math.round(rating * 10) / 10
    if (rating<1 || rating>5 || ratings< 1.0 || ratings>5.0) throw 'Invalid rating'

}

const bandIdCheck= async (bandId)=>{
    if(!bandId) throw 'Provide valid band Id'
    if(typeof bandId !== 'string') throw 'Band Id should be a string'
    if (bandId.trim().length===0) throw 'Band Id can not be empty'
    bandId=bandId.trim()
    if(!ObjectId.isValid(bandId)) throw 'Invalid object band Id'
}

const albumIdCheck= async (albumId)=>{
    if(!albumId) throw 'Provide valid album Id'
    if(typeof albumId !== 'string') throw 'Album Id should be a string'
    if (albumId.trim().length===0) throw 'Album Id can not be empty'
    albumId=albumId.trim()
    if(!ObjectId.isValid(albumId)) throw 'Invalid object album Id'
}

const UpdateOverallRating =async(bandWithAlbum)=>{
    let sum=0
    if(bandWithAlbum.albums.length ===0){
        return sum
    }
    else{
        bandWithAlbum.albums.forEach(element=>{
            sum=sum+element.rating
        })
        let avg=sum/(bandWithAlbum.albums.length)
        let Avg=Math.round(avg * 10) / 10
        return Avg
    }
}

const create=async function create(bandId, title, releaseDate, tracks, rating){
    await bandIdCheck(bandId)
    await errorHandling(title, releaseDate, tracks, rating)

    const bandCollection= await bands();
    const albumCollection= await albums();
    let aid=new ObjectId()
    let albumsData={
        _id:aid,
        title:title, 
        releaseDate:releaseDate, 
        tracks:tracks, 
        rating:rating
    }
    let bid=ObjectId(bandId)
    const insertal = await albumCollection.insertOne(albumsData);
    if(insertal.modifiedCount==0) throw {code: 500, error:`Album not added`}
    let insertedalbum= await bandCollection.updateOne({ _id:bid  },{ $push: {albums: albumsData}})
    if(insertedalbum.modifiedCount==0) throw {code: 500, error:`Album can not be added`}

    let bandWithAlbum= await bandFinal.get(bandId)
    if(!bandWithAlbum) throw {code:404, error:`Unable to fetch`}

    let overallRating=await UpdateOverallRating(bandWithAlbum)
    if(overallRating==0){
        insertedalbum=await bandCollection.updateOne({ _id: ObjectId(bandId) },{$set:{overallRating:overallRating}})
        if(insertedalbum.modifiedCount==0) throw {code: 500, error:`overAllRating can not be added`}
    }
    else if(bandWithAlbum.albums.length==1 || overallRating !== rating){
        insertedalbum=await bandCollection.updateOne({ _id: ObjectId(bandId) },{$set:{overallRating:overallRating}})
        if(insertedalbum.modifiedCount==0) throw {code: 500, error:`overAllRating can not be added`}
    }

    bandWithAlbum= await bandFinal.get(bandId)
    if(!bandWithAlbum) throw {code:404, error:`Unable to fetch`}

    bandWithAlbum_id=bandWithAlbum._id.toString()
    bandWithAlbum.albums.forEach(element=>{
        element._id=element._id.toString()
    })

    return bandWithAlbum;

}

const getAll= async function getAll(bandId){
    await bandIdCheck(bandId)
    let bandWithAlbum= await bandFinal.get(bandId)
    if(!bandWithAlbum) throw {code:404, error:`No such band exist`}

    bandWithAlbum.albums.forEach(element=>{
        element._id=element._id.toString()
    })

    return bandWithAlbum.albums;
}

const get= async function get(albumId){
    await albumIdCheck(albumId)
    const bandCollection= await bands();
    let res
    let bandWithAlbum= await bandCollection.find({}).toArray()
    bandWithAlbum.forEach(element=>{
        element.albums.forEach(field=>{
            if(field._id.toString()===albumId){
                res=field
                res._id=res._id.toString()
            }
        })
    })
    if(!res) throw {code:404, error: `No album for the id`};
    return res
}

const remove= async function remove(albumId){
    await albumIdCheck(albumId)
    const bandCollection= await bands();
    let bandWithAlbum= await bandCollection.find({}).toArray()
    let  removedId,  bandId
    
    bandWithAlbum.forEach( element=>{
        bandId=element._id
        element.albums.forEach(async field=>{
                if(field._id.toString()===albumId){
                    removedId=albumId
                    const res=await bandCollection.updateOne({_id:bandId},{$pull: {albums:{_id:ObjectId(albumId)}}})
                    if(!res) throw 'Unable to remove the album'
        }
        })
        
    })
   
   
        bandId=bandId.toString()
        let bandWAlbum= await bandFinal.get(bandId)
        if(!bandWAlbum) throw {code:404, error:`Unable to fetch`}
    
        let OverallRating=await UpdateOverallRating(bandWAlbum)
        if(OverallRating==0){
            res=await bandCollection.updateOne({ _id: ObjectId(bandId) },{$set:{overallRating:OverallRating}})
            if(res.modifiedCount==0) throw {code: 500, error:`overAllRating can not be updated`}
        }
        else {
            res=await bandCollection.updateOne({ _id: ObjectId(bandId) },{$set:{overallRating:OverallRating}})
            if(res.modifiedCount==0) throw {code: 500, error:`overAllRating can not be updated`}
        }
    
    
    return {albumId: removedId.toString(),deleted: true}

}

module.exports={
    create,
    getAll,
    get,
    remove
}
