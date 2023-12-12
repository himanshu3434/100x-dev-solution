/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let arr= Array(128).fill(0);
   let s=str1.toLowerCase();
   let t=str2.toLowerCase();
  for(let i=0;i<s.length;i++){

      let index=s.charCodeAt(i);
      
      arr[index]++;
  }
  
  for(let i=0;i<t.length;i++){
       let index=t.charCodeAt(i);
      arr[index]--;
  }
   
  for(let i=0;i<arr.length;i++){
      if(arr[i]!=0)return false;
    
  }
 
  


  return true;
}

module.exports = isAnagram;
