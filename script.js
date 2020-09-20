// ```
// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN prompted for character types to include in the password
// THEN I choose lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page
// ```

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//  write new function called generatePassword returning a string for the password

// function to shuffle the final password to randomize the pattern
function shuffle(string) {
  var a = string.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}
// function will generate password based on options of including uppercase/lowercase letters, numbers and special characters
function generatePassword() {
  // function to force valid length at the very beginning
  function askForPwdLen() {
    var promptPwdLen = prompt(
      "Please select a password length between 8 and 128?"
    );

    while (promptPwdLen < 8 || promptPwdLen > 128) {
      alert("Invalid password length Entered!");
      promptPwdLen = prompt(
        "Please enter a valid password length not less than 8 and not greater than 128"
      );
    }
    return promptPwdLen;
  }

  // function to handle password options

  function askForPwdOptions() {
    var promptUpperCase = confirm("Should password include Uppercase Letters?");
    var promptLowerCase = confirm("Should password include Lowercase Letters?");
    var promptNbr = confirm("Should password include Numbers?");
    var promptSpecial = confirm("Should password include special characters?");

    while (promptLowerCase + promptNbr + promptUpperCase + promptSpecial < 1) {
      alert("You must select at least one password option!");
      promptUpperCase = confirm("Should password include Uppercase Letters?");
      promptLowerCase = confirm("Should password include Lowercase Letters?");
      promptNbr = confirm("Should password include Numbers?");
      promptSpecial = confirm("Should password include special characters?");
    }
    return [promptUpperCase, promptLowerCase, promptNbr, promptSpecial];
  }
  // call functions to prompt, capture, validate then return pwd options and length
  const pwdLen = askForPwdLen();
  var pwdOptions = askForPwdOptions();

  var inclUpperCase = pwdOptions[0];
  var inclLowerCase = pwdOptions[1];
  var inclNbr = pwdOptions[2];
  var inclSpecial = pwdOptions[3];

  // section to determine how many times loop should run based on selected length and options
  var newPassword = "";
  var countOfConditions = inclUpperCase + inclLowerCase + inclNbr + inclSpecial;
  var loopCount = Math.ceil(pwdLen / countOfConditions);
  var finalPassword = "";

  // loop to select random values based on ascii chars and append to password variable
  for (var i = 0; i < loopCount + 1; i++) {
    if (inclUpperCase === true && newPassword.length < pwdLen) {
      newPassword += String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    }
    if (inclLowerCase === true && newPassword.length < pwdLen) {
      newPassword += String.fromCharCode(Math.floor(Math.random() * 26 + 97));
    }
    if (inclNbr === true && newPassword.length < pwdLen) {
      newPassword += String.fromCharCode(Math.floor(Math.random() * 9 + 49));
    }
    if (inclSpecial === true && newPassword.length < pwdLen) {
      newPassword += String.fromCharCode(Math.floor(Math.random() * 15 + 33));
    }
  }

  //shuffle the values to further randomize
  finalPassword = shuffle(newPassword);

  // return the generated password
  return finalPassword;
}
