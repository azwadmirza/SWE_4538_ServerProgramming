const fs=require('fs');

console.log('Before');


fs.readFile('./data.txt','utf-8',readHandler=(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
});

fs.writeFile('./data.txt',"Hello World",(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('File Written Successfully');
    }
})

console.log('After');
fs.readFile('./data.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('File Read Successfully');
        console.log(data);
    }
})