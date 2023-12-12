let n = 0;
function call_timeout() {
  setTimeout(() => {
    count();
  }, 1000);
}
function count() {
  n++;
  console.log(n);
  call_timeout();
}

count();
