// A mock function to mimic making an async request for data
export function fetchLoggedInUser() {
  return new Promise(async(resolve) =>
   { 
    const response=await fetch('http://localhost:8005/users/getuser')
    const data =await response.json()
    resolve({data})}
  );
}

export function fetchLoggedInUserOrders() {
  return new Promise(async(resolve) =>
   { 
    const response=await fetch('http://localhost:8005/orders/')    
    const data =await response.json()
    resolve({data})}
  );
}

export function updateUser(update) {
  return new Promise(async(resolve) =>
   { 
   const response=await fetch('http://localhost:8005/users/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
   })
    const data =await response.json()
    resolve({data})}
  );
}