if (!localStorage.getItem('access_token')) {
    window.location.href = './../index.html';
}

var urlParams = new URLSearchParams(window.location.search);


function validateRole() {

    const response = fetch('http://localhost:8000/api/user/show', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ localStorage.getItem('access_token'),
        }
    });
    response.then(res => {
        if (res.status === 401) {
            alert('Token incorrecto')
            localStorage.removeItem('access_token')
            window.location.href = './../index.html';
        } else if (res.status === 200){
            res.json().then(r => {
                fetch(`http://localhost:8000/api/user/edit/${urlParams.get('id')}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer '+ localStorage.getItem('access_token'),
                    }
                }).then(async edit => {
                    edit = await edit.json()
                    const createDiv = document.getElementById("edit-div");
                    if (r.rol === 1 || r.rol === 2 ) { // 1= admin, 2 = vendedor
                        if (edit.rol === 1 && r.rol === 2) {
                            createDiv.innerHTML = "NO puedes editar";
                            return;
                        }
                        createDiv.innerHTML = `
                            <form id="form">
                                <div class="row" style="margin-top: 1rem">
                                    <div class="col col-3">
                                        <input type="text" class="form-control" placeholder="Nombre" id="name" value="${edit.name}">
                                    </div>
                                    <div class="col col-3">
                                        <input type="text" class="form-control" placeholder="Documento" id="document" value="${edit.document}">
                                    </div>
                                    <div class="col col-3">
                                        <input type="text" class="form-control" placeholder="Direccion" id="direccion" value="${edit.direction}">
                                    </div>
                                    <div class="col col-3">
                                        <input type="email" class="form-control" placeholder="Correo" id="mail" value="${edit.mail}">
                                    </div>
                                    <div class="col col-3">
                                        <select name="" id="rol" value="${edit.rol}" class="form-control">
                                            ${r.rol == 1 ? '<option value="1">Admin</option><option value="2">Vendedor</option>': ''}
                                            <option value="3">Cliente</option>
                                        </select>
                                    </div>
                                    <div class="col col-3">
                                        <input type="submit" value="Crear" class="btn btn-success">
                                    </div>
                                </div>
                            </form>
                        `;


                        const form = document.getElementById('form');
                        form.addEventListener('submit', logSubmit);
                    } else {
                        createDiv.innerHTML = "Eres un cliente, no puedes crear usuarios"
                    }

                });

            });
        }
    })
}

validateRole();

function logSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const documento = document.getElementById('document').value;
    const direction = document.getElementById('direccion').value;
    const mail = document.getElementById('mail').value;
    const rol = document.getElementById('rol').value;

    const response = fetch(`http://localhost:8000/api/user/update/${urlParams.get('id')}`, {
        method: 'PUT',
        body:  JSON.stringify({name, document: documento, direction, rol: parseInt(rol), mail}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ localStorage.getItem('access_token'),
        }
    });

    response.then(res=> {
        if (res.status === 401) {
            alert('Token incorrecto')
            localStorage.removeItem('access_token')
            window.location.href = './../index.html';
        } else if (res.status === 200){
            res.json().then(r => {
                alert(r.message);
                window.location.reload();
            });
        } else {
            res.json().then(r => {
                let str = "";
                // hice el for in para imprimir el mensaje de error de laravel
                for (const k in r) {
                    str += `${k}: ${r[k][0]} \n`
                }
                alert(str);
            });
        }
    });

}