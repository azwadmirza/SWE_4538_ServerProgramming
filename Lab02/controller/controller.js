const fs=require('fs');
const os=require('os');

const welcome=(req,res)=>{
    res.status(200).send('Welcome!');
}

const fetchData=(req,res)=>{
    fs.readFile('data/data.json','utf-8',(err,data)=>{
        if(err){
            res.status(500).json({message:'Error Occured'});
        }
        else{
            res.status(200).json({message:'File Read Successfully',data:JSON.parse(data)});
        }
    });
}



const writeData=(req,res)=>{
    fs.writeFile('data/data.json','['+JSON.stringify(req.body)+']',(err,data)=>{
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
    fs.readFile('data/data.json','utf-8',(err,data)=>{
        if(err){
            res.status(404).json({message:'File Not Found',error_message:err});
        }
        else{
            if(data.length===0){
                val={};
                
            }
            else{
                val=JSON.parse(data);
            }
            let obj;
            if(Array.isArray(val)){
                obj=[...val,req.body];
            }
            else{
                obj=[req.body]
            }
            fs.writeFile('data/data.json',JSON.stringify(obj),(err,data)=>{
                if(err){
                    console.log(err);
                    res.status(404).json({message:'Error Occured',error_message:err});
                }
                else{
                    res.status(200).json({message:'File Appended Successfully'});
                }
            });
            
        }
    });
}

const deleteData=(req,res)=>{
    fs.unlink('data/data.json',(err,data)=>{
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
    const current_os={
        name: os.type(),
        release: os.release(),
        totalMem: os.totalmem(),
        freeMem: os.freemem()
    }
    fs.readFile('data/os-info.json','utf-8',(err,data)=>{
        if(err){
            res.status(404).json({message:'File Not Found',error_message:err});
        }
        else{
            let obj=null;
            let initialData;
            try{
                obj=JSON.parse(data);
                initialData={...obj};
            }
            catch(err){
                fs.writeFile('data/os-info.json','['+JSON.stringify(current_os)+']',(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(404).json({message:'Error Occured',error_message:err});
                    }
                    else{
                        res.status(200).json({message:'File Created Successfully',initial_data:{},final_data:current_os});
                    }
                });
            }
            
            if(obj){
                obj.push(current_os);
                fs.writeFile('data/os-info.json',JSON.stringify(obj),(err)=>{
                    if(err){
                        console.log(err);
                        res.status(404).json({message:'Error Occured',error_message:err});
                    }
                    else{
                        res.status(200).json({message:'File Appended Successfully',initial_data:initialData,final_data:obj});
                    }
                });
            }
            
        }
    });
    
}

module.exports={
    welcome,
    fetchData,
    writeData,
    appendData,
    deleteData,
    osInfo
}