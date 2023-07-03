// A mock function to mimic making an async request for data
export function fetchLoggedInUser(userId) {
  return new Promise(async(resolve) =>
   { 
    // const response=await fetch('http://localhost:3000/users/'+userId)
    const response=await fetch('http://localhost:8005/users/'+userId)
    const data =await response.json()
    resolve({data})}
  );
}

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async(resolve) =>
   { 
    // const response=await fetch('http://localhost:3000/orders/?user.id='+userId)
    const response=await fetch('http://localhost:8005/orders/?user='+userId)    
    const data =await response.json()
    resolve({data})}
  );
}

export function updateUser(update) {
  return new Promise(async(resolve) =>
   { 
  //   const response=await fetch('http://localhost:3000/users/'+update.id,{
  //     method:'PATCH',
  //     body:JSON.stringify(update),
  //     headers:{'content-type':'application/json'}
  //  })
   const response=await fetch('http://localhost:8005/users/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
   })
    const data =await response.json()
    resolve({data})}
  );
}