const signupbutton = document.getElementById('signup');
const signinbutton = document.getElementById('signin');
const container = document.getElementById('container');

signupbutton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
}
);

signinbutton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
}
);