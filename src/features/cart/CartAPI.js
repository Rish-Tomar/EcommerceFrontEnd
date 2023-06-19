// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
   })
    const data =await response.json()
    resolve({data})}
  );
}


export function fetchItemsByUserID(userID) {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/cart?user='+userID)
    const data =await response.json()
    resolve({data})}
  );
}


export function updateCartItem(update) {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
   })
    const data =await response.json()
    resolve({data})}
  );
}

export function deleteCartItem(id) {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/cart/'+id,{
      method:'DELETE',
      headers:{'content-type':'application/json'}
   })
    const data =await response.json()
    resolve({data:{id:id}})}
  );
}

export async function resetCart(userId) {
  //get all items of user cart and then delete
  return new Promise(async(resolve) =>{
  const response = await fetchItemsByUserID(userId);
  const items = response.data 
  for(let item of items){
    await deleteCartItem(item.id)
  }
  resolve({status:'success'})
});
}