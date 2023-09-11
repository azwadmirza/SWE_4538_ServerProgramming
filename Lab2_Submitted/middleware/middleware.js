const apiKeyMiddleware =(req,res,next)=>{
    const apiKey=req.query.apiKey;
    if(apiKey==='server-programming'){
        next();
    }
    else{
        res.status(401).json({message:'Unauthorized Access'});
    }
}

module.exports={apiKeyMiddleware};