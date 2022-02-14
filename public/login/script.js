const loginForm = `<div class="form-inputs">
<div class="input-container">
  <div class="form-row">
    <input class="form-input" type="text" id="login-username" placeholder="Username" />
  </div>
  <div class="form-row">
    <input class="form-input" type="password" id="login-password" placeholder="Password"/>
  </div>
</div>
<button id="login-submit-button" type="submit" class="login submit-button">Login</button>
<button id="swap-form"> Need to register? </button> 
</div>`
const registerForm = `<div class="form-inputs">
<div class="input-container">
  <div class="form-row">
    <input class="form-input" type="text" id="reg-username" placeholder="Username" />
  </div>
  <div class="form-row">
  <input class="form-input" type="text" id="reg-email" placeholder="Email"/>
  </div>
  <div class="form-row">
    <input class="form-input" type="password" id="reg-password" placeholder="Password"/>
  </div>
</div>
<button id="reg-submit-button" class="submit-button register" type="submit">Register</button>
<button id="swap-form"> Already have an account? </button> 
</div>`

const form = document.getElementById('main-form');


const login = async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value
  const password = document.getElementById('login-password').value
  let result = '';
  
  fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then((data) => {
    result = data.statusText
    console.log(result);
  })

  document.getElementById('login-username').value = ''
  document.getElementById('login-password').value = ''
}

const register = async (e) => {
  e.preventDefault()
  const username = document.getElementById('reg-username').value
  const email = document.getElementById('reg-email').value
  const password = document.getElementById('reg-password').value
  let result = '';

  fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
  .then( (data) => {
    result = data.statusText
    console.log(result)
  })

  document.getElementById('reg-username').value = ''
  document.getElementById('reg-email').value = ''
  document.getElementById('reg-password').value = ''
}


const updateForm = (val) => {
  if(val == 'login') {
    form.innerHTML = loginForm
    const swapButton = document.getElementById('swap-form')
    swapButton.onclick = () => {updateForm('register')}
    form.onsubmit = login
  } else {
    form.innerHTML = registerForm
    const swapButton = document.getElementById('swap-form')
    swapButton.onclick = () => {updateForm('login')}
    form.onsubmit = register
  }
}
updateForm('login');