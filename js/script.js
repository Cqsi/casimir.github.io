function myFunction(num){
    if(num == "C"){
        document.getElementById("demo").textContent = "";
    }else{
        document.getElementById("demo").textContent = document.getElementById("demo").textContent + num;
    }
}