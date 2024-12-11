/**
 * This function checks if a string is a palindrome or not 
 * by taking the input string and cleaning it by removing all non-alphanumeric characters.
 * @param {*} str 
 * @returns 
 */

const isPalindrome = (str) => {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversedStr = cleanedStr.split("").reverse().join("");
  return cleanedStr === reversedStr;
};

const checkButton = document.getElementById("check-btn");
checkButton.addEventListener("click", () => {
  const inputElement = document.getElementById("text-input");
  const resultElement = document.getElementById("result");
  const inputValue = inputElement.value.trim();

  if (!inputValue) {
    alert("Please input a value");
    return;
  }

  const isInputPalindrome = isPalindrome(inputValue);
  if (isInputPalindrome) {
    resultElement.textContent = `${inputValue} is a palindrome`;
  } else {
    resultElement.textContent = `${inputValue} is not a palindrome`;
  }
});
