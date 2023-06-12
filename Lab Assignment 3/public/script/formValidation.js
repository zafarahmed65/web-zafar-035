function validate () {
  var nameField = document.myForm.Name;
  var emailField = document.myForm.Email;


var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var subjectField = document.myForm.Subject;
  var msgField = document.myForm.Message;


  if (nameField.value === '') {
    alert ('Please provide your name!');
    nameField.focus ();
    nameField.style.borderColor = 'red';
    return false;
  }
  else{
    nameField.style.borderColor = 'blue';
  }

  if (!emailField.value.match(emailFormat)) {
    alert("Please provide a valid email address!");
    emailField.focus();
    emailField.style.borderColor = "red";
    return false;
  }
  else{
    emailField.style.borderColor = 'blue';
  }
  if (subjectField.value === '') {
    alert ('Please provide valid subject!');
    subjectField.focus ();
    subjectField.style.borderColor = 'red';
    return false;
  }
  else{
    subjectField.style.borderColor = 'blue';
  }
  if (msgField.value === '') {
    alert ('Please input your message!');
    msgField.focus ();
    msgField.style.borderColor = 'red';
    return false;
  }
  else{
    msgField.style.borderColor = 'blue';
  }

  alert ('Form submitted successfully!');
  return true;
}


