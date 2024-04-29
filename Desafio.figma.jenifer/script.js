function modalOpen() {
    document.getElementById('modal').classList.add('active');
    document.querySelector("h2").innerText = "Novo usuário";
    document.getElementById("saveValues").innerText =  "Salvar";
}

function modalClose() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('userRegistration').addEventListener('click', modalOpen);
document.getElementById('modalClose').addEventListener('click', modalClose);

function addUser() {
    let listUser = [];

    const id =  Math.floor(Math.random() * 100);
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cel = document.getElementById('cel').value;
    const city = document.getElementById('city').value;

    const objUser = {
        idUser: id,
        nameUser: nome,
        emailUser: email,
        celUser: cel,
        cityUser: city
    };

    if (localStorage.getItem('CadastroUsuarios')) {
        listUser = JSON.parse(localStorage.getItem('CadastroUsuarios'));
    }

    listUser.push(objUser);

    localStorage.setItem("CadastroUsuarios", JSON.stringify(listUser));

    modalClose();

    window.location.reload();
}

document.getElementById('saveValues').addEventListener('click', addUser);

// função para carregar os dados de usuário
function carregarUsuario() {
    let listUser = [];

    if(localStorage.getItem("CadastroUsuarios")) {
        listUser = JSON.parse(localStorage.getItem("CadastroUsuarios"));
    }

    if (listUser.length == 0) {
        let tabela = document.getElementById('corpoTabela');

        tabela.innerHTML = `
        <tr>
            <td colspan='5'>Nenhum usuário cadastrado</td>
        </tr>
        `;
    } else {
        createTableUser(listUser);
    }
}

document.addEventListener('DOMContentLoaded', carregarUsuario);

function createTableUser(dadosUsuario) {
    let tabela = document.getElementById('corpoTabela');

    let template = '';

    dadosUsuario.forEach(user => {
        template +=`
            <tr>
                <td>${user.nameUser}</td>
                <td>${user.emailUser}</td>
                <td>${user.celUser}</td>
                <td>${user.cityUser}</td>
                <td>
                    <button type="button" class="button green" onclick="updateUser(${user.idUser})">Editar</button>
                    <button type="button" class="button red" onclick="deleteUser(${user.idUser})">Excluir</button>
                </td>
            </tr>
        `;
    });

    tabela.innerHTML = template;
}

function updateUser(id) {
    document.getElementById("saveValues").removeEventListener("click", addUser);
    modalOpen();

    const textTitleUpdateUser = document.querySelector("h2");
    textTitleUpdateUser.innerText = "Atualizar";

    document.getElementById("saveValues").innerText = "Atualizar";

    document.getElementById("saveValues").addEventListener("click", function() {
        location.reload();
    })

    const getUserData = JSON.parse(localStorage.getItem("CadastroUsuarios"));

    const userData = getUserData.find(identificarUsuarios => identificarUsuarios.idUser === id);

    document.getElementById("name").value = userData.nameUser;
    document.getElementById("email").value = userData.emailUser;
    document.getElementById("cel").value = userData.celUser;
    document.getElementById("city").value = userData.cityUser;

    document.getElementById("cancelUpdate").addEventListener("click", () => {
        modalClose();
        document.getElementById("saveValues").removeEventListener("click", updateUserInfo);
        document.getElementById("saveValues").addEventListener("click", addUser);
    });

    document.getElementById("saveValues").addEventListener("click", () => {
        updateUserInfo(id);
    });
}

function updateUserInfo(id) {
    const newName = document.getElementById("name").value;
    const newEmail = document.getElementById("email").value;
    const newCel = document.getElementById("cel").value;
    const newCity = document.getElementById("city").value;

    const userList = JSON.parse(localStorage.getItem("CadastroUsuarios") || []);

    const userIndexFind = userList.findIndex(user => user.idUser === id);

    if (userIndexFind !== -1) {
        userList[userIndexFind].nameUser = newName;
        userList[userIndexFind].emailUser = newEmail;
        userList[userIndexFind].celUser = newCel;
        userList[userIndexFind].cityUser = newCity;

        localStorage.setItem("CadastroUsuarios", JSON.stringify(userList));
        modalClose();
        window.location.reload();
    }
}

function deleteUser(id) {
    let userList = JSON.parse(localStorage.getItem("CadastroUsuarios") || []);

    const findUser = userList.findIndex((user) => user.idUser === id);



    if (findUser !== -1) {
        userList.splice(findUser, 1);
        localStorage.setItem("CadastroUsuarios", JSON.stringify(userList));
        window.location.reload(); // Recarrega a página para refletir a exclusão

    }
}