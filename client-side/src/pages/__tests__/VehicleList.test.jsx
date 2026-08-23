import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import VehicleList from '../VehicleList'
import { useAuth } from '../../context/AuthContext'

import {
  getVehicles,
  purchaseVehicle,
} from '../../services/vehicleApi'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../../services/vehicleApi', () => ({
  getVehicles: vi.fn(),
  purchaseVehicle: vi.fn(),
}))

const mockVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    category: 'Sedan',
    price: 25000,
    quantity: 5,
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    category: 'Sedan',
    price: 15000,
    quantity: 0,
  },
  {
    id: 3,
    make: 'Tesla',
    model: 'Model 3',
    category: 'Electric',
    price: 45000,
    quantity: 2,
  },
]

const renderVehicleList = () => {
  return render(
    <MemoryRouter>
      <VehicleList />
    </MemoryRouter>,
  )
}

describe('VehicleList', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getVehicles.mockResolvedValue(mockVehicles)

    useAuth.mockReturnValue({
      user: {
        username: 'testuser1',
        role: 'USER',
      },
    })
  })

  it('loads and displays vehicles', async () => {
    renderVehicleList()

    expect(
      await screen.findByText('Camry'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Civic'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Model 3'),
    ).toBeInTheDocument()
  })

  it('filters vehicles by search text', async () => {
    renderVehicleList()

    await screen.findByText('Camry')

    const searchInput = screen.getByPlaceholderText(
      'Search by make or model...',
    )

    fireEvent.change(searchInput, {
      target: {
        value: 'Tesla',
      },
    })

    expect(
      screen.getByText('Model 3'),
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Camry'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Civic'),
    ).not.toBeInTheDocument()
  })

  it('filters vehicles by category', async () => {
    renderVehicleList()

    await screen.findByText('Camry')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Electric',
      }),
    )

    expect(
      screen.getByText('Model 3'),
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Camry'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Civic'),
    ).not.toBeInTheDocument()
  })

  it('filters out vehicles with zero stock', async () => {
    renderVehicleList()

    await screen.findByText('Camry')

    fireEvent.click(
      screen.getByRole('button', {
        name: '✓ In Stock Only',
      }),
    )

    expect(
      screen.getByText('Camry'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Model 3'),
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Civic'),
    ).not.toBeInTheDocument()
  })

  it('shows Add Vehicle button for admin', async () => {
    useAuth.mockReturnValue({
      user: {
        username: 'testuser1',
        role: 'ADMIN',
      },
    })

    renderVehicleList()

    await screen.findByText('Camry')

    expect(
      screen.getByRole('link', {
        name: /Add Vehicle/i,
      }),
    ).toBeInTheDocument()
  })

  it('does not show Add Vehicle button for normal user', async () => {
    useAuth.mockReturnValue({
      user: {
        username: 'customer1',
        role: 'USER',
      },
    })

    renderVehicleList()

    await screen.findByText('Camry')

    expect(
      screen.queryByRole('link', {
        name: /Add Vehicle/i,
      }),
    ).not.toBeInTheDocument()
  })

  it('purchases a vehicle and updates its stock', async () => {
    purchaseVehicle.mockResolvedValue({
      message: 'Vehicle purchased successfully',
      vehicle: {
        ...mockVehicles[0],
        quantity: 4,
      },
    })

    renderVehicleList()

    await screen.findByText('Camry')

    const purchaseButtons = screen.getAllByRole(
      'button',
      {
        name: 'Purchase',
      },
    )

    fireEvent.click(purchaseButtons[0])

    await waitFor(() => {
      expect(purchaseVehicle).toHaveBeenCalledWith(
        1,
        1,
      )
    })

    expect(
      screen.getByText('In Stock: 4'),
    ).toBeInTheDocument()
  })

  it('disables purchase for out-of-stock vehicles', async () => {
    renderVehicleList()

    await screen.findByText('Civic')

    const soldOutButton =
      screen.getByRole('button', {
        name: 'Sold Out',
      })

    expect(soldOutButton).toBeDisabled()

    expect(purchaseVehicle).not.toHaveBeenCalled()
  })
})