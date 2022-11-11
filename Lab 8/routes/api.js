const express = require('express');
const router = express.Router();
const data = require('../data');
const  api= data.api;

router.get('/',async(req,res)=>{
    try{
        res.render('pages/search',{title:"Show Finder"});
    }
    catch(e){
        res.status(404).json({ error: e });
    }
})

router.post('/searchshows',async(req,res)=>{
    let showData=req.body.showSearchTerm;
    let error=[]
    shows=showData.trim()
    if(!shows){
        error.push('No show name provided');
    }
    if(error.length>0){
        res.render('pages/error', {
			errors: error,
			hasErrors: true,
			title: 'Input should not be empty',
		});
		return;
    }

    try{
        const shows=await api.getSearchShow(showData)
        res.render('pages/searchShows', {showSearchTerm : showData, shows : shows, title: "Shows Found"});
    }catch(e){
        res.status(400).render('pages/searchShows', {showSearchTerm : showData, shows : null, title: "Error"});
        return;
    }
})


router.get('/show/:id', async (req, res) => {
    let id=req.params.id;
    if(!id || id.trim().length==0 || isNaN(parseInt(id))){
        res.status(400).render('pages/error', {error: "Invalid ID", title: "Error"});
        return;
    }
    try{
        const showById= await api.getShowById(id)
        res.render('pages/id', {show : showById, title: showById.name})
    }catch(e){
        res.status(400).render('pages/error', {show : null, title: "No such show with the given id"});
        return;
    }
})

module.exports=router;