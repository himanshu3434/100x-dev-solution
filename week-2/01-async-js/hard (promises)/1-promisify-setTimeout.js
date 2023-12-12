/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  const p = new Promise((resolve) => {
    setTimeout(() => {
      // console.log("hi");
      resolve();
    }, n * 1000);
  });
  //console.log(p);
  return p;
}

module.exports = wait;
