const router=require('express').Router();
const path=require('path');

const options = {
    root: path.join(__dirname)
};

router.get('/',(req,res)=>{
    res.status(200).send("Welcome");
})

router.get('/hello',(req,res)=>{
    res.status(200).send("Hello");
})

router.get('/world',(req,res)=>{
    res.status(200).send("World");
})

router.get('/helloworld',(req,res)=>{
    res.status(200).sendFile('views/index.html',options);
});

module.exports={
    router
}