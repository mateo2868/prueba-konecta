
if( localStorage.getItem('access_token') ){
    console.log('hola')
    window.location.href = './views/page.html';
    // return
}

async function logSubmit(event) {

    event.preventDefault();
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    const json = {mail, password};
    const response = fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        body:  JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    response.then(res=> {
        if (res.status === 401) {
            alert('Error');
        } else {
            res.json().then(r => {
                localStorage.setItem('access_token', r.access_token)
                window.location.href = './views/page.html';
            });
        }
    });
}

const form = document.getElementById('form');
form.addEventListener('submit', logSubmit);