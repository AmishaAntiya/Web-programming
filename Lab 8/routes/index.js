const apiRoutes= require('./api');
const path=require('path');

const constructorMethod=(app)=>{
    app.use('/',apiRoutes);
    app.use('*',(req,res)=>{
        res.status(404).render(`pages/error`, {code:404, error: '404:Page Not found' });
    })
}

module.exports=constructorMethod;