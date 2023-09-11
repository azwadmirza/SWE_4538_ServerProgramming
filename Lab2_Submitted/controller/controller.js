const fs=require('fs');
const os=require('os');

const welcome=(req,res)=>{
    res.status(200).send('Welcome!');
}

const fetchData=(req,res)=>{
    fs.readFile('./data.json',(err)=>{
        if(err){
            res.status(500).json({message:'Error Occured'});
        }
        else{
            res.status(200).json({message:'File Read Successfully'});
        }
    });
}



const writeData=(req,res)=>{
    fs.writeFile('./data.json',JSON.stringify(req.body),(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:'Error Occured'});
        }
        else{
            res.status(200).json({message:'File Wrote Successfully'});
        }
    });
}

const appendData=(req,res)=>{
    fs.appendFile('./data.json',JSON.stringify(req.body),(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:'Error Occured'});
        }
        else{
            res.status(200).json({message:'File Appended Successfully'});
        }
    });
}

const deleteData=(req,res)=>{
    fs.unlink('./data.json',(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:'Error Occured'});
        }
        else{
            res.status(200).json({message:'File Deleted Successfully'});
        }
    });
}

const osInfo=(req,res)=>{
    const initialData=fs.readFile('./os-info.json','utf-8',(err,data)=>{
        if(err){
            return -1;
        }
        else{
            return data;
        }
    })
    fs.appendFile('./os-info.json',JSON.stringify({
        name: os.type(),
        release: os.release(),
        totalMem: os.totalmem(),
        freeMem: os.freemem()
    }),(err,data)=>{
        if(err){
            return -1;
        }
        else{
            return data;
        }
    });
    const finalData=fs.readFile('./os-info.json','utf-8',(err,data)=>{
        if(err){
            return -1;
        }
        else{
            return data;
        }
    })
    res.status(200).json({message:'File Appended Successfully',initialData:initialData,finalData:finalData});
}

module.exports={
    welcome,
    fetchData,
    writeData,
    appendData,
    deleteData,
    osInfo
}