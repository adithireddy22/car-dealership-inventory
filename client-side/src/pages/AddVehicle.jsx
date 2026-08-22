import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createVehicle } from '../services/vehicleApi'

function AddVehicle() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: '',
    price: '',
    quantity: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    const price = Number(formData.price)
    const quantity = Number(formData.quantity)

    if (!Number.isFinite(price) || price <= 0) {
      setError('Price must be greater than 0.')
      return
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      setError('Quantity must be a valid integer greater than or equal to 0.')
      return
    }

    setLoading(true)

    try {
      const vehicle = await createVehicle({
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category.trim(),
        price: price,
        quantity: quantity,
      })

      navigate(`/vehicles/${vehicle.id}`)
    } catch (error) {
      console.error('Add vehicle error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Add Vehicle</h1>

      {error && (
        <p>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>
            Make
          </label>

          <br />

          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>
            Model
          </label>

          <br />

          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>
            Category
          </label>

          <br />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>
            Price
          </label>

          <br />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <br />

        <div>
          <label>
            Quantity
          </label>

          <br />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            step="1"
            required
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Adding...'
            : 'Add Vehicle'}
        </button>

      </form>

      <br />

      <button
        type="button"
        onClick={() => navigate('/vehicles')}
      >
        Cancel
      </button>
    </div>
  )
}

export default AddVehicle