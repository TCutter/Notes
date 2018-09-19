

const getJSON = function(url){
    return new Promise((resolve,reject)=>{
        const handle = function(){
            if(this.readyState === 4 ){
                if(this.status === 200){
                    resolve(this.responce);
                }else{
                    reject(new Error(this.statusText));
                }
            }
        }
        const request = new XMLHttpRequest();
        request.onreadystatechange = handle;
        request.open("GET",url);
        request.responseType = "json";
        request.setRequestHeader("Acception",'application/json');
        request.send();
    }); 
}

getJSON('localhost:8080/getData?name=test').then(success=>{
    console.info("Content:"+success);
},error=>{
    console.error("Error:"+error);
})