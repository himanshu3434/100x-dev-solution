/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/
function check(s){
  if(s=='a'||s=='e'||s=='i'||s=='o'||s=='u'){
    return true;
  }
  else return false;
}

function countVowels(str) {
    // Your code here
   let s= str.toLowerCase();
   let cnt=0;
   for(let i=0;i<s.length;i++){
     if(check(s[i]))
     cnt++;
   }

   return cnt;
}

module.exports = countVowels;