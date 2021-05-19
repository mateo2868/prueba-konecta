if (!localStorage.getItem('access_token')) {
    window.location.href = './../index.html';
}

function allUser() {
    // Instanciar la tabla con el tbody existente
    // y la fila con el template
    const table = document.querySelector('#users'),
    td = table.content.querySelectorAll("td");
    td[0].textContent = usersJson;
    td[1].textContent = usersJson;

    // Clonar la nueva fila e insertarla en la tabla
    var tb = document.querySelector("tbody");
    var clone = document.importNode(table.content, true);
    tb.appendChild(clone);

    // Crear una nueva fila
    td[0].textContent = "0384928528";
    td[1].textContent = "Acme Kidney Beans";

    // Clonar la nueva fila e insertarla en la tabla
    var clone2 = document.importNode(t.content, true);
    tb.appendChild(clone2);

    return 
    // Consulta todos los usuarios
    const response = fetch('http://localhost:8000/api/users', {
        method: 'POST',
        body:  JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    response.then(res => {
        if(res.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = './../index.html';
        }

        const usersJson = res.json();
        
    
    })
    return;
}


allUser();