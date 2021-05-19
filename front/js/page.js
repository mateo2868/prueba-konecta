if (!localStorage.getItem('access_token')) {
    window.location.href = './../index.html';
}

function allUser() {
    // Instanciar la tabla con el tbody existente
    // y la fila con el template
    // Consulta todos los usuarios

    const response = fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ localStorage.getItem('access_token'),
        }
    });


    response.then(async res => {
        if(res.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = './../index.html';
        }
        res.json().then(r => {
            console.log(r);
            const table = document.getElementById("users");
            for (let i = 0; i < r.users.length; i++) {
                const row = table.insertRow(i);

                const cell0 = row.insertCell(0);
                const cell1 = row.insertCell(1);
                const cell2 = row.insertCell(2);
                const cell3 = row.insertCell(3);
                const cell4 = row.insertCell(4);
                const cell5 = row.insertCell(5);

                cell0.innerHTML = r.users[i].name;
                cell1.innerHTML = r.users[i].document;
                cell2.innerHTML = r.users[i].mail;
                cell3.innerHTML = r.users[i].direction;
                cell4.innerHTML = r.users[i].rol;
                if (r.rol !== 3) {
                    cell5.innerHTML = `<a href="./edit.html?id=${r.users[i].id}" class="btn btn-success">Editar</a> <button class="btn btn-danger" onclick="eliminar(${r.users[i].id})">Eliminar</button>`;
                }
            }
        })
    })
    return;
}

function logout() {
    fetch(`http://localhost:8000/api/auth/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ localStorage.getItem('access_token'),
        }
    }).then(r => {
        localStorage.removeItem('access_token');
        window.location.href = './../index.html';

    })
}

function eliminar(id) {
    var r = confirm("Esta seguro ?");
    if (r == true) {
        const response = fetch(`http://localhost:8000/api/user/destroy/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+ localStorage.getItem('access_token'),
            }
        })
        response.then(async res => {
            res.json().then(r => {
                alert(r.message);
                window.location.reload();
            })
        })
    };
}


allUser();