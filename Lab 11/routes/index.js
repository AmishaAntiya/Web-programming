const path=require('path');

const constructorMethod=(app)=>{
    app.get('/',(req,res)=>{
        res.sendFile(path.resolve('public/static.html'));
    });
    app.use('*',(req,res)=>{
        res.status(404).sendFile(path.resolve('public/error.html'));
    })
}

module.exports=constructorMethod;