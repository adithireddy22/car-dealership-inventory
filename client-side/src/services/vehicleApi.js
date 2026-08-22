import { request } from './api'

export const getVehicles = async () => {
  return request('/api/vehicles')
}

export const getVehicle = async (vehicleId) => {
  return request(`/api/vehicles/${Number(vehicleId)}`)
}

export const createVehicle = async (vehicleData) => {
  return request('/api/vehicles', {
    method: 'POST',
    body: JSON.stringify(vehicleData),
  })
}

export const updateVehicle = async (
  vehicleId,
  vehicleData
) => {
  return request(`/api/vehicles/${Number(vehicleId)}`, {
    method: 'PUT',
    body: JSON.stringify(vehicleData),
  })
}

export const deleteVehicle = async (vehicleId) => {
  return request(`/api/vehicles/${Number(vehicleId)}`, {
    method: 'DELETE',
  })
}

export const purchaseVehicle = async (
  vehicleId,
  quantity
) => {
  return request(
    `/api/vehicles/${Number(vehicleId)}/purchase`,
    {
      method: 'POST',
      body: JSON.stringify({
        quantity,
      }),
    }
  )
}

export const restockVehicle = async (
  vehicleId,
  quantity
) => {
  return request(
    `/api/vehicles/${Number(vehicleId)}/restock`,
    {
      method: 'POST',
      body: JSON.stringify({
        quantity,
      }),
    }
  )
}