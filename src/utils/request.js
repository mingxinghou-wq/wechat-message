// 后端地址：优先页面内设置（localStorage），其次构建期 VITE_API_URL
const API_KEY = 'CHATKB_API_URL'

export const getApiBase = () => {
  try {
    return localStorage.getItem(API_KEY) || import.meta.env.VITE_API_URL || ''
  } catch (e) {
    return import.meta.env.VITE_API_URL || ''
  }
}

export const setApiBase = (v) => {
  try {
    if (v && v.trim()) localStorage.setItem(API_KEY, v.trim().replace(/\/+$/, ''))
    else localStorage.removeItem(API_KEY)
  } catch (e) {}
}

export const apiGet = async (url, params = {}) => {
  const base = getApiBase()
  const search = new URLSearchParams(params).toString()
  const fullUrl = `${base}${url}${search ? '?' + search : ''}`
  const res = await fetch(fullUrl)
  return await res.json()
}

export const apiPost = async (url, data) => {
  const base = getApiBase()
  const res = await fetch(`${base}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await res.json()
}
