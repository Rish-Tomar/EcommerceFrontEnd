
// A mock function to mimic making an async request for data
export function createUser(userData) {
    return new Promise(async(resolve) =>
     { 
    //     const response=await fetch('http://localhost:3000/users',{
    //     method:'POST',
    //     body:JSON.stringify(userData),
    //     headers:{'content-type':'application/json'}
    //  })
        const response=await fetch('http://localhost:8005/users/signup',{
          method:'POST',
          body:JSON.stringify(userData),
          headers:{'content-type':'application/json'}
      })
      const data =await response.json()
      resolve({data})}
    );
  }
  
export function checkUserOlder(loginInfo) {
  return new Promise(async(resolve,reject) =>
    { 
      const email =loginInfo.email
      const password=loginInfo.password
      const response=await fetch('http://localhost:3000/users?email='+email)
    const data =await response.json()
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
      }else{
        reject({message:'password not matched'})
      }      
    }else{
      reject({message:'user not found'})
    }
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async(resolve,reject) =>
    {
      try{
          const response=await fetch('http://localhost:8005/users/login/',{
            method:'POST',
            body:JSON.stringify(loginInfo),
            headers:{'content-type':'application/json'}
          })
          if(response.ok){
            const data =await response.json()
            resolve({data})
          }
          else{
            const err =await response.json()
            reject({err})
          }            
      }catch(err){
        console.log("ERROR in verifying checkUser under AuthAPI",err)
        reject({message:'user not found'})
      }
    }
  );
}
  
 
export function SignOutUser(userId) {
  return new Promise(async(resolve) =>
   {
    resolve({data:"success"})}
  );
}