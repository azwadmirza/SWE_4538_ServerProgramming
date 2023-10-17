const validate_password=(password)=>{
    if(password.length<8){
        return false;
    }
    else{
        let count=0;
        for(let i=0;i<password.length;i++){
            if(password[i]>='a' && password[i]<='z'){
                count++;
                break;
            }
        }
        for(let i=0;i<password.length;i++){
            if(password[i]>='A' && password[i]<='Z'){
                count++;
                break;
            }
        }
        for(let i=0;i<password.length;i++){
            if(password[i]>='0' && password[i]<='9'){
                count++;
                break;
            }
        }
        for(let i=0;i<password.length;i++){
            if(password[i]>=' ' && password[i]<='/'){
                count++;
                break;
            }
        }
        if(count===4){
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports=validate_password;