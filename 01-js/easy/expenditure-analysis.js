/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
 
  let arr=[];
  let flag=Array(transactions.length).fill(0);
  for(let i=0;i<transactions.length;i++){
    if(flag[i]==1)continue;
    let cat=transactions[i].category;
    let price=transactions[i].price;



    let check=1;
    for(let j=0;j<arr.length;j++){
      if(cat==arr[j].category)
      {
        arr[j].totalSpent+=price;
        flag[i]=1;
        check=0;
      }    

      
    }
    if(check==1)
    arr.push({category:cat,totalSpent:price})
  }


  return arr;
}

module.exports = calculateTotalSpentByCategory;
