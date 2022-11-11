const routes= require('./prime');


const constructorMethod=(app)=>{
    app.use('/',routes);
    app.use('*',(req,res)=>{
        res.status(404).render(`prime/error`, {code:404, error: '404:Page Not found' });
    })
}

module.exports=constructorMethod;