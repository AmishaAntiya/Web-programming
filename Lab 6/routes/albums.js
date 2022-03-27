const express = require('express');
const router = express.Router();
const albums = require('../data/albums');
const bands= require('../data/bands')
const { ObjectId } = require('mongodb');


router.get('/:id', async (req, res) => {
    let id=req.params.id.trim();
    if(!id){
      res.status(400).json({error:'Invalid id'});
      return
    }
    if(typeof id !== 'string') {
      res.status(400).json({error:'Id should be a string'});
      return
    }
    if (id.length===0) {
      res.status(400).json({error:'Id can not be empty'});
      return
    }
    if(!ObjectId.isValid(id)){
      res.status(400).json({error: 'Invalid id'});
      return
    }
    try{
        let allAlbums=await albums.getAll(id)
        if(!allAlbums) {
            res.status(404).json({error: 'No album for the id'});
            return
        }
        res.status(200).json(allAlbums)
    }catch(e){
        res.status(404).json({error: 'No such bandId'})
    }
});

router.post('/:id', async (req, res) => {
    let id=req.params.id.trim();
    if(!id){
        res.status(400).json({error:'Invalid id'});
        return
      }
      if(typeof id !== 'string') {
        res.status(400).json({error:'Id should be a string'});
        return
      }
      if (id.length===0) {
        res.status(400).json({error:'Id can not be empty'});
        return
      }
      if(!ObjectId.isValid(id)){
        res.status(400).json({error: 'Invalid id'});
        return
      }

      let detail=req.body
      let rating=Math.round(detail.rating* 10) / 10
      if(!detail.title || !detail.releaseDate || !detail.tracks ){
        res.status(400).json({error: "Fields can not be empty"});
        return
      }
      if(!rating){
        res.status(400).json({error: 'rating can not be empty'});
        return
      }
      if(typeof detail.title !== 'string' || detail.title.trim().length ==0  ){
        res.status(400).json({error: 'title should be non-empty string'});
        return
      }
      if(typeof detail.releaseDate !== 'string' || detail.releaseDate.trim().length ==0){
        res.status(400).json({error: 'releaseDate should be non-empty string'});
        return
      }
      if(Array.isArray(detail.tracks) ==false || detail.tracks.length < 3){
        res.status(400).json({error: 'tracks should be an array having at least 3 elements'});
        return
      }
      detail.tracks.forEach(element => { 
        if(typeof element !== 'string' ) {
            res.status(400).json({error:'Tracks should only be array of string'});
            return
        }
        else if(element.trim().length ==0) {
            res.status(400).json({error: 'Tracks can not have empty element'});
            return
        }
      });
      let d=detail.releaseDate.split('/')
      m=d[0]-1
      d=d[1]
      y=d[2]
      if(m>11 || m<0){
        res.status(400).json({error: 'Invalid release date'});
        return
      }  
      if(m ==0 || m==2 || m ==4 || m ==6 ||m ==7 || m ==9 || m==11){
            if(d>31 || d<1) {
                res.status(400).json({error: 'Invalid release date'});
                return
            }
        }
       
       if(m==3 || m ==5 || m ==8 || m ==10){
            if(d>30 || d<1){
                res.status(400).json({error: 'Invalid release date'});
                return
            }
        }

        if(m==1){
            if(d>29 || d<1) {
                res.status(400).json({error: 'Invalid release date'});
                return
            }
        }

        
        if(y<1900 || y>2023) {
            res.status(400).json({error: 'Invalid year in releaseDate'});
            return
        }
        if(typeof rating !== 'number' || rating == NaN){
            res.status(400).json({error: 'Invalid rating'});
            return
        } 
        if (rating< 1.0 || rating>5.0) {
            res.status(400).json({error: 'Invalid rating'});
            return
        } 
        try{
            await bands.get(id)
        }catch(e){
            res.status(404).json({error: 'No such band'});
        }
        try{
            let albumByBandId= await albums.create(id,detail.title, detail.releaseDate, detail.tracks, rating)
            res.status(200).json(albumByBandId);
        }catch(e){
            res.status(400).json({error: e.message});
        }
});


router.get('/albums/:id',async (req,res)=>{
    let id=req.params.id.trim();
    if(!id){
      res.status(400).json({error:'Invalid id'});
      return
    }
    if(typeof id !== 'string') {
      res.status(400).json({error:'Id should be a string'});
      return
    }
    if (id.length===0) {
      res.status(400).json({error:'Id can not be empty'});
      return
    }
    if(!ObjectId.isValid(id)){
      res.status(400).json({error: 'Invalid id'});
      return
    }
    try{
        let albumByAlbumId=await albums.get(id)
        if(!albumByAlbumId) {
            res.status(404).json({error: 'No album for the id'});
            return
        }
        res.status(200).json(albumByAlbumId)
    }catch(e){
        res.status(400).json(e)
    }
});

router.delete('/albums/:id', async (req, res) => {
    let id=req.params.id.trim();
    if(!id){
      res.status(400).json({error:'Invalid id'});
      return
    }
    if(typeof id !== 'string') {
      res.status(400).json({error:'Id should be a string'});
      return
    }
    if (id.length===0) {
      res.status(400).json({error:'Id can not be empty'});
      return
    }
    if(!ObjectId.isValid(id)){
      res.status(400).json({error: 'Invalid id'});
      return
    }
    try{
        let albumByAlbumId=await albums.get(id)
        if(!albumByAlbumId) {
            res.status(404).json({error: 'No album with that id is found'});
            return
        }
    }catch(e){
        res.status(400).json(e)
    }
    try{
        let deletedAlbum= await albums.remove(id)
        res.status(200).json(deletedAlbum);
    }catch(e){
        res.status(404).json(e);
    }
});

module.exports = router;
