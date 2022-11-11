const express = require('express');
const router = express.Router();
const users = require('../data/users');

const errorHandling = async (username,password)=>{
    if(!username) throw {code: 400, error: `username can not be empty`}
    if(typeof username != "string") throw {code: 400, error: `username needs to be string`}
    if(username.trim().length==0) throw {code: 400, error: `username can not be empty`}
    if(username.includes(" ") === true) throw {code: 400, error: `username can not have space`}
    const regex=/^[a-z0-9]+$/i
    if(regex.test(username)===false) throw {code: 400, error: `username should be alphanumeric character`}
    if(username.length<4) throw {code: 400, error: `username should be at least 4 character long`}

    if(!password) throw {code: 400, error: `password can not be empty`}
    if(typeof password != "string") throw {code: 400, error: `password needs to be string`}
    if(password.trim().length==0) throw {code: 400, error: `password can not be empty`}
    if(password.includes(" ") === true) throw {code: 400, error: `password can not have space`}
    if(password.length<6) throw {code: 400, error: `password should be at least 6 character long`}

}

router.get('/',async(req,res)=>{
    if(!req.session.login) return res.render('users/login',{title:"Login"});
    res.redirect('/private')
})

router.get('/signup',async(req,res)=>{
    if(!req.session.login) return res.render('users/signup',{title:"Signup"});
    res.redirect('/private')
})

router.post('/signup',async(req,res)=>{
    let detail=req.body
    let {username,password}= detail
    try{
        await errorHandling(username,password)
        let resUser=await users.createUser(username,password)
        res.redirect('/')
    }catch(e){
        if(e.code) res.status(e.code).render('users/signup',{errors: true, error: e.error, title: "Signup"})
        else res.status(500).json("Internal Server Error")
    }
})

router.post('/login',async(req,res)=>{
    let detail=req.body
    let {username,password}= detail
    try{
        await errorHandling(username,password)
        let resUser= await users.checkUser(username,password)
        req.session.login=resUser
        req.session.username=username
        res.redirect('/private')
    }catch(e){
        if(e.code) res.status(e.code).render('users/login',{errors: true, error: e.error, title: "Login"})
        else res.status(500).json("Internal Server Error")
    }
})

router.get('/private',async(req,res)=>{
    res.render('users/private', {username: req.session.username, title: "Private"})
})

router.get('/logout',async(req,res)=>{
    req.session.destroy()
    res.render('users/logout',{title:"Logged out"})
})

module.exports=router