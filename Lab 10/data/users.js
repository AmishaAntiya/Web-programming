const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt=require('bcryptjs');

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

const createUser= async function (username, password){
    await errorHandling(username,password);
    const data=await users();
    username=username.toLowerCase();

    let userExist=await data.findOne({username:username})
    if(userExist) throw {code: 400, error: `There is already a user with the given username`}

    const saltRounds = 10;
    let hashedPassword= await bcrypt.hash(password,saltRounds);
    let user={_id: new ObjectId(), username:username,password:hashedPassword};
    let newUser=await data.insertOne(user);
    if(newUser.insertedCount===0) throw {code: 500, error: `Could not create user`};
    return {userInserted: true}
}

const checkUser=async function (username, password){
    await errorHandling(username,password);
    const data=await users();
    username=username.toLowerCase();

    let user=await data.findOne({username:username})
    if(!user) throw {code: 400, error: `Either the username or password is invalid`}

    let passCheck=await bcrypt.compare(password,user.password)
    if(!passCheck) throw {code: 400, error: `Either the username or password is invalid`}

    return {authenticated: true}
}

module.exports={
    createUser,
    checkUser
}