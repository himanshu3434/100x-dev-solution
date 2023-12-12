/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let s=str.toLowerCase();
  let i=0,j=s.length-1;
  while(i<j){
    if(s.charCodeAt(i)<97||s.charCodeAt(i)>122){
      i++;
      continue;
    }
    if(s.charCodeAt(j)<97||s.charCodeAt(j)>122){
     j--;
      continue;
    }
    
    if(s[i]==s[j])
    {
      i++;
      j--;

    }
    else
    return false;
  }
  return true;
}

module.exports = isPalindrome;
