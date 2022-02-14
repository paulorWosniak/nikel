const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transaction: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html"
});

document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const value = parseFloat(document.getElementById("value-imput").value);
    const descripsion = document.getElementById("description-imput").value;
    const date = document.getElementById("date-imput").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transaction.unshift({
        value: value, type: type, descripsion: descripsion, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();


    alert("lançamentoadicionado com sucesso.");
});

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if (!logged) {
        window.location.href = "index.html"
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function getCashIn() {
    const transaction = data.transaction;

    const cashIn = transaction.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
               <div class="row mb-4">
               <div class="col-12">
                   <h3 class="fs-2">${cashIn[index].value.toFixed(2)}</h3>
                   <div class="container p-0">
                       <div class="row">
                           <div class="col-12 col-md-8">
                               <p>${cashIn[index].descripsion}</p>
                           </div>
                           <div class="col-12 col-md-3 d-flex justifuy-content-end">
                               ${cashIn[index].date}
                           </div>
                       </div>
                   </div>

               </div>
           </div>
               `

        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut() {
    const transaction = data.transaction;

    const cashOut = transaction.filter((item) => item.type === "1");

    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;

        if (cashOut.length > 5) {
            limit = 5;
        } else {
            limit = cashOut.length;
        }
        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
               <div class="row mb-4">
               <div class="col-12">
                   <h3 class="fs-2">${cashOut[index].value.toFixed(2)}</h3>
                   <div class="container p-0">
                       <div class="row">
                           <div class="col-12 col-md-8">
                               <p>${cashOut[index].descripsion}</p>
                           </div>
                           <div class="col-12 col-md-3 d-flex justifuy-content-end">
                               ${cashOut[index].date}
                           </div>
                       </div>
                   </div>

               </div>
           </div>
               `

        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

function getTotal() {
    const transaction = data.transaction;
    transaction.forEach((item) => {
        if (item.type === "1") {
            Total += item.value;
        } else {
            Total -= item.value;
        }
    });

    document.getElementById("Total").innerHTML = `R$ ${Total.toFixed(2)}`;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
