if (!localStorage.getItem('access_token')) {
    window.location.href = './../index.html';
}

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
                const createDiv = document.getElementById("create-div");
                if (r.rol === 1 || r.rol === 2 ) { // 1= admin, 2 = vendedor
                    createDiv.innerHTML = `
                        <form id="form">
                            <div class="row" style="margin-top: 1rem">
                                <div class="col col-3">
                                    <input type="text" class="form-control" placeholder="Nombre" id="name">
                                </div>
                                <div class="col col-3">
                                    <input type="text" class="form-control" placeholder="Documento" id="document">
                                </div>
                                <div class="col col-3">
                                    <input type="text" class="form-control" placeholder="Direccion" id="direccion">
                                </div>
                                <div class="col col-3">
                                    <input type="email" class="form-control" placeholder="Correo" id="mail">
                                </div>
                                <div class="col col-3">
                                    <input type="password" class="form-control" placeholder="Contraseña" id="password">
                                </div>
                                <div class="col col-3">
                                    <select name="" id="rol" class="form-control">
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
    console.log(rol)
    const password = document.getElementById('password').value;

    const response = fetch('http://localhost:8000/api/user/store', {
        method: 'POST',
        body:  JSON.stringify({name, document: documento, direction, rol: parseInt(rol), mail, password}),
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