document.getElementById('registerForm').addEventListener('submit', SendSubmission);

function SendSubmission(e) {
    e.preventDefault();
    var unm = document.querySelector('#username').value;
    var email = document.querySelector('#email').value;
    var pwd = document.querySelector('#password').value;
    var pwdConfirm = document.querySelector('#passwordConfirm').value;
    var birthday = document.querySelector('#birthday').value;
    var status = document.querySelector('#status').value;

    if(pwd === pwdConfirm) {
        fetch('/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */register*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({Username: unm, Email: email, Password: pwd, PasswordConfirm: pwdConfirm, Birthday: birthday, Status: status})
        }).then((res) => {
            res.json();
        }).then((data) => {
            console.log(data);
        });
    } else {
        document.getElementById('info').innerHTML = "Your passwords don't match.";
    }
}