const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email-imput").value;
    const password = document.getElementById("password-imput").value;
    const session = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Opps Verefique o usuario ou a senha.");
        return;
    }
    if(account){
        if(account.password !== password){
            alert("Opps Verefique o usuario ou a senha.");
        return;
        }

        saveSession(email, session);
    
        window.location.href = "home.html"
    }
});

//Criar Conta 
document.getElementById("creat-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email= document.getElementById("email-create-imput").value;
    const password= document.getElementById("password-creat-imput").value;

    if(email.length < 5){
        alert("Preencha o campo com um e-mail válido.");
        return;
    }
    if(password.length <4){
        alert("Preencha o senha com no minimo 4 digitos.");
        return; 
    }
    saveAccount({
        login:email,
        password: password,
        transaction:[]
    });
    myModal.hide();
    alert("conta criada com sucesso...");
});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(logged){
        saveSession(logged, session);
        window.location.href ="home.html"
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("check", data);
    }
    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);
    if(account){
        return JSON.parse(account);
    }
    return "";
}