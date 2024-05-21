export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")
  const data = await res.json()
  return data
}

export async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const data = await res.json()
  return data
}

export async function getCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories")
  const data = await res.json()
  return data
}

export async function loginUser(creds) {
  const res = await fetch(`https://fakestoreapi.com/users`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await res.json();
}