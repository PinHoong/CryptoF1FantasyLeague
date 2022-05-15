const signupForm = document.querySelector("#contact-form");
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm["email"].value;
    const password = signupForm['password'].value;
    const firstName = signupForm['firstName'].value;
    const lastName = signupForm['lastName'].value;
    const favtm = signupForm['favtm'].value;
    const gender = signupForm['gender'].value;

    console.log(email, password);
})