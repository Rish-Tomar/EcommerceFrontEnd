// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async(resolve) =>
  //  todo
   { const response=await fetch('http://localhost:3000/products')
    const data =await response.json()
    resolve({data})}
  );
}

export function fetchCategories() {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/categories')
    const data =await response.json()
    resolve({data})}
  );
}

export function fetchProduct(id) {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/products/'+id)
    const data =await response.json()
    resolve({data})}
  );
}

export function fetchBrands() {
  return new Promise(async(resolve) =>
   { const response=await fetch('http://localhost:3000/brands')
    const data =await response.json()
    resolve({data})}
  );
}

export function fetchProductsByFilters(filter) {
  //filter has object with key values like filter={"category":"laptop"}

  let querryString="";
  for (let key in filter){
    querryString+=`${key}=${filter[key]}&`
  }
  return new Promise(async(resolve) =>
  //  todo
   { const response=await fetch('http://localhost:3000/products?'+querryString)
    const data =await response.json()
    resolve({data})}
  );
}
