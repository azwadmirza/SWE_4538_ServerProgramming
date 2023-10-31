const fs=require('fs');
const insert=(id,username,email,password)=>{

    const user={
        id:id,
        username:username,
        email:email,
        password:password
    }
    fs.readFile('data/data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data.length===0){
                val=[];
            }
            else{
                val=JSON.parse(data);
            }
            obj=[...val,user];
            fs.writeFileSync('data/data.json',JSON.stringify(obj),(err,data)=>{
                if(err){
                    console.log(err);
                }
            });
            
        }
    });
}

const findById=(id)=>{
    const user=fs.readFileSync('data/data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data.length===0){
                val=[];
            }
            else{
                val=JSON.parse(data);
            }
            let obj=null;
            val.forEach((item)=>{
                if(item.id===id){
                    obj=item;
                    return item;
                }
            })
            user=obj;
            
        }
    });
    return user;
}

const findByEmail=(email)=>{
    const user=fs.readFileSync('data/data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data.length===0){
                val=[];
            }
            else{
                val=JSON.parse(data);
            }
            val.forEach((item)=>{
                if(item.email===email){
                    user=item;
                    return item;
                }
            })
            
        }
    });
    return user;
}

const find=()=>{
    let user;
    const result=fs.readFileSync('data/data.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            user=data;
        }
    });
    return JSON.parse(result);
}

module.exports={insert,findById,findByEmail,find};