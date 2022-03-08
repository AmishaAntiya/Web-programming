const express = require('express');
const router = express.Router();
const { userApi } = require('../data');

router.get('/people', async (req, res) => {
    try {
      const peopleList = await userApi.getAllP()
      res.json(peopleList);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/work', async (req, res) => {
    try {
      const companyList = await userApi.getAllW();
      res.json(companyList);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/people/:id', async (req, res) => {
    try {
      let id = req.params.id.trim()
      let numId=Number(id)
      if(!Number.isInteger(numId)){
        res.status(499).json({error:"id should be whole number"})
      }
      const personById = await userApi.getPersonById(numId);
      res.json(personById);
    } catch (e) {
        if(e) {res.status(404).json({message: e});}
        else {res.status(404).json({message: 'No person with this ID'});}
    }
});

router.get('/work/:id', async (req, res) => {
    try {
      let id = req.params.id.trim()
      let numId=Number(id)
    if(!Number.isInteger(numId)){
        res.status(499).json({error:"id should be whole number"})
      }
      
      const companyById = await userApi.getCompanyById(numId);
      res.json(companyById);
    } catch (e) {
        if(e) {res.status(404).json({message: e});}
        else {res.status(404).json({message: 'No company with this ID'});}
    }
});


module.exports = router;