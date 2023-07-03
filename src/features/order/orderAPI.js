// A mock function to mimic making an async request for data
export function addOrder() {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/orders')
    const data =await response.json()
    resolve({data})}
  );
}

export function createOrder(order) {
  return new Promise(async(resolve,reject) =>
    {
      // try{
          console.log("orderAPI frontend",order)
          const response=await fetch('http://localhost:8005/orders/add',{
              method:'POST',
              body:JSON.stringify(order),
              headers:{'content-type':'application/json'}
          })
          if(response.ok){
            const data =await response.json()
            resolve({data})
          }
      //     else{
      //       const err =await response.json()
      //       console.log("reject Error",err)
      //       reject({err})
      //     }      
      // }catch(err){
      //   console.log("careateOrderAPi",err)
      // }
    }
  );
}
