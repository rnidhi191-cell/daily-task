document.getElementById("registerform").addEventListener("submit",async(e)=>e.preventDefault())
    
const email = document.querySelector('input[name="email"]').value;
const password=document.querySelector('input[name="password"]').value;
const name=document.querySelector('input[name="name"]').value;


const res = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    const data= await res.json();
    if(data.success){
        window.location.href='/login'
    }else{
        document.getElementById("error").innerText=data.message||"registration failed"}