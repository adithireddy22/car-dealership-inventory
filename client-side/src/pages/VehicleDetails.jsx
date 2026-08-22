import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  getVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from '../services/vehicleApi'

function VehicleDetails() {
  const { vehicleId } = useParams()
  const navigate = useNavigate()

  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadVehicle = async () => {
    try {
      setError('')

      const id = Number(vehicleId)

      if (!Number.isInteger(id)) {
        throw new Error('Invalid vehicle ID')
      }

      const data = await getVehicle(id)

      setVehicle(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVehicle()
  }, [vehicleId])

  const handleDelete = async () => {
    try {
      await deleteVehicle(Number(vehicleId))

      navigate('/vehicles')
    } catch (error) {
      setError(error.message)
    }
  }

  const handlePurchase = async () => {
    try {
      const data = await purchaseVehicle(
        Number(vehicleId),
        1
      )

      setVehicle(data.vehicle)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleRestock = async () => {
    try {
      const data = await restockVehicle(
        Number(vehicleId),
        1
      )

      setVehicle(data.vehicle)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <p>Loading vehicle...</p>
  }

  if (error) {
    return (
      <div>
        <h1>Vehicle Details</h1>
        <p>{error}</p>

        <Link to="/vehicles">
          Back to Vehicles
        </Link>
      </div>
    )
  }

  if (!vehicle) {
    return <p>Vehicle not found.</p>
  }

  return (
    <div>
      <h1>
        {vehicle.make} {vehicle.model}
      </h1>

      <p>
        Category: {vehicle.category}
      </p>

      <p>
        Price: ₹{vehicle.price}
      </p>

      <p>
        Quantity: {vehicle.quantity}
      </p>

      <button onClick={handlePurchase}>
        Purchase 1
      </button>

      <button onClick={handleRestock}>
        Restock 1
      </button>

      <button onClick={handleDelete}>
        Delete Vehicle
      </button>

      <br />
      <br />

      <Link to="/vehicles">
        Back to Vehicles
      </Link>
    </div>
  )
}

export default VehicleDetails