const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const bands  = require('../data/bands')
const { ObjectId } = require('mongodb');


router.get('/',async (req, res) => {
    try {
      const bandList = await bands.getAll()
      let requiredBandList=[]
      for(let i=0;i<bandList.length;i++){
        requiredBandList.push({_id:bandList[i]._id,name:bandList[i].name})
      }
      res.json(requiredBandList);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});




router.post('/',async(req,res)=>{
  let detail=req.body

  if(!detail.name || !detail.genre || !detail.website || !detail.recordLabel || !detail.bandMembers || !detail.yearFormed){
    res.status(400).json({error: 'Fields can not be empty'});
    return
  }
  if(typeof detail.name !== 'string' || detail.name.trim().length ==0){
    res.status(400).json({error: 'Name should be non-empty string'});
    return
  }
  if(typeof detail.website !== 'string' || detail.website.trim().length == 0){
    res.status(400).json({error: 'website should be non-empty string'});
    return
  }
  if(typeof detail.recordLabel !== 'string' || detail.recordLabel.trim().length == 0){
    res.status(400).json({error: 'recordLabel should be non-empty string'});
    return
  }
  if (detail.website.startsWith("http://www.") == false || detail.website.endsWith(".com") == false || detail.website.length < 20 ){
    res.status(400).json({error: 'Invalid website'});
    return
  }
  if(Array.isArray(detail.genre) == false || Array.isArray(detail.bandMembers) == false) {
    res.status(400).json({error: 'Genre and bandMember should be an array'});
    return
  }
  if(detail.genre.length ==0){
    res.status(400).json({error: 'Genre can not be empty'});
    return
  }
  detail.genre.forEach(element => { 
      if(typeof element !== 'string' ) {
        res.status(400).json({error: 'Genre should only be array of string'});
        return
      }
      else if(element.trim().length ==0) {
        res.status(400).json({error: 'Genre can not have empty element'});
        return
      }
  });

  if(detail.bandMembers.length ==0) {
    res.status(400).json({error: 'bandMember can not be empty'});
    return
  }
  detail.bandMembers.forEach(element => { 
      if(typeof element !== 'string') {
        res.status(400).json({error: 'band member should only be array of string'});
        return
      }
      else if(element.trim().length ==0) {
        res.status(400).json({error:  'band memeber can not have empty element'});
        return
      }
  });

  if(typeof detail.yearFormed !== 'number') {
    res.status(400).json({error:'Year the band was formed should be a number'});
    return
  }
  if (detail.yearFormed<1900 || detail.yearFormed>2022){
    res.status(400).json({error:'Invalid input for year the band was formed'});
     return
  }

  try{
    let band=await bands.create(detail.name, detail.genre, detail.website, detail.recordLabel, detail.bandMembers, detail.yearFormed)
    res.status(200).json(band);
  }catch(e){
    res.status(400).json({error: e.message});
  }

});




router.get('/:id',async (req, res) => {
  id = req.params.id.trim()
  if(!id){
    res.status(400).json({error:'Provide valid Id to search for band'});
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
    let band=await bands.get(id)
    res.status(200).json(band)
  }catch(e){
    res.status(404).json({error: 'No such band'});
  }
});




router.put('/:id',async (req, res) => {
  id = req.params.id.trim()
  if(!id){
    res.status(400).json({error:'Provide valid Id to search for band'});
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

  if(!detail.name || !detail.genre || !detail.website || !detail.recordLabel || !detail.bandMembers || !detail.yearFormed){
    res.status(400).json({error: 'Fields can not be empty'});
    return
  }
  if(typeof detail.name !== 'string' || detail.name.trim().length ==0){
    res.status(400).json({error: 'Name should be non-empty string'});
    return
  }
  if(typeof detail.website !== 'string' || detail.website.trim().length == 0){
    res.status(400).json({error: 'website should be non-empty string'});
    return
  }
  if(typeof detail.recordLabel !== 'string' || detail.recordLabel.trim().length == 0){
    res.status(400).json({error: 'recordLabel should be non-empty string'});
    return
  }
  if (detail.website.startsWith("http://www.") == false || detail.website.endsWith(".com") == false || detail.website.length < 20 ){
    res.status(400).json({error: 'Invalid website'});
    return
  }
  if(Array.isArray(detail.genre) == false || Array.isArray(detail.bandMembers) == false) {
    res.status(400).json({error: 'Genre and bandMember should be an array'});
    return
  }
  if(detail.genre.length ==0){
    res.status(400).json({error: 'Genre can not be empty'});
    return
  }
  detail.genre.forEach(element => { 
      if(typeof element !== 'string' ) {
        res.status(400).json({error: 'Genre should only be array of string'});
        return
      }
      else if(element.trim().length ==0) {
        res.status(400).json({error: 'Genre can not have empty element'});
        return
      }
  });

  if(detail.bandMembers.length ==0) {
    res.status(400).json({error: 'bandMember can not be empty'});
    return
  }
  detail.bandMembers.forEach(element => { 
      if(typeof element !== 'string') {
        res.status(400).json({error: 'band member should only be array of string'});
        return
      }
      else if(element.trim().length ==0) {
        res.status(400).json({error:  'band memeber can not have empty element'});
        return
      }
  });

  if(typeof detail.yearFormed !== 'number') {
    res.status(400).json({error:'Year the band was formed should be a number'});
    return
  }
  if (detail.yearFormed<1900 || detail.yearFormed>2022){
    res.status(400).json({error:'Invalid input for year the band was formed'});
     return
  }
  try{
    await bands.get(id)
  }catch(e){
    res.status(404).json({error: 'No such band'});
  }
  try{
    let updatedBand= await bands.update(id, detail.name, detail.genre, detail.website, detail.recordLabel, detail.bandMembers, detail.yearFormed)
    res.status(200).json(updatedBand);
  }catch(e){
    res.status(400).json({error: e.message});
  }
});




router.delete('/:id',async (req, res) => {
  id = req.params.id.trim()
  if(!id){
    res.status(400).json({error:'Provide valid Id to search for band'});
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
    await bands.get(id)
  }catch(e){
    res.status(404).json({error: 'No such band'});
  }
  try{
    let deletedBand=await bands.remove(id)
    res.status(200).json(deletedBand)
  }catch(e){
    res.status(400).json({error: e});
  }
});

module.exports = router;