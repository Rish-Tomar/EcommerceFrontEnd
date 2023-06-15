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
