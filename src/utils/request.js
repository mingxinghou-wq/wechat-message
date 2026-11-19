const base = import.meta.env.VITE_API_URL || ''

export const apiGet = async (url, params = {}) => {
  const search = new URLSearchParams(params).toString()
  const fullUrl = `${base}${url}${search ? '?' + search : ''}`
  const res = await fetch(fullUrl)
  return await res.json()
}

export const apiPost = async (url, data) => {
  const res = await fetch(`${base}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await res.json()
}
