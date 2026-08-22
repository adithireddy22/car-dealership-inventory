const API_BASE_URL = 'http://127.0.0.1:8000'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('access_token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  )

  const data = await response
    .json()
    .catch(() => null)

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      'Something went wrong. Please try again.'

    throw new Error(message)
  }

  return data
}

export const registerUser = async (userData) => {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export const loginUser = async (credentials) => {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export const getCurrentUser = async () => {
  return request('/api/auth/me')
}