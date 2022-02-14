const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transaction: []
};
document.getElementById("button-logout").addEventListener("click", logout);

document.getElementById("trasacion-form").addEventListener("submit", function (e) {
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

    getTransaction();

    alert("lançamentoadicionado com sucesso.");
});

checkLogged();

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");


    window.location.href = "index.html";
}
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
    getTransaction();
}
function getTransaction() {
    const transaction = data.transaction;
    let transactionHtml = ``;
    if (transaction.length) {
        transaction.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }
            transactionHtml += `
        <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.descripsion}</td>
        </tr>
            `
        })
    }
    document.getElementById("transaction-list").innerHTML = transactionHtml;

}
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

