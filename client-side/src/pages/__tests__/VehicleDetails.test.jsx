import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom'

import VehicleDetails from '../VehicleDetails'
import { AuthProvider } from '../../context/AuthContext'


/* =========================================================
   MOCK FUNCTIONS
========================================================= */

const mockGetCurrentUser = vi.fn()

const mockGetVehicle = vi.fn()
const mockPurchaseVehicle = vi.fn()
const mockRestockVehicle = vi.fn()
const mockDeleteVehicle = vi.fn()


/* =========================================================
   MOCK AUTH API
========================================================= */

vi.mock('../../services/api', () => ({
  getCurrentUser: (...args) =>
    mockGetCurrentUser(...args),

  loginUser: vi.fn(),

  registerUser: vi.fn(),
}))


/* =========================================================
   MOCK VEHICLE API
========================================================= */

vi.mock('../../services/vehicleApi', () => ({
  getVehicle: (...args) =>
    mockGetVehicle(...args),

  purchaseVehicle: (...args) =>
    mockPurchaseVehicle(...args),

  restockVehicle: (...args) =>
    mockRestockVehicle(...args),

  deleteVehicle: (...args) =>
    mockDeleteVehicle(...args),
}))


/* =========================================================
   TEST VEHICLE
========================================================= */

const vehicle = {
  id: 1,
  make: 'Toyota',
  model: 'Camry',
  category: 'sedan',
  price: 20000,
  quantity: 5,
}


/* =========================================================
   RENDER HELPER
========================================================= */

const renderVehicleDetails = () => {
  localStorage.setItem(
    'access_token',
    'test-token',
  )

  return render(
    <MemoryRouter
      initialEntries={['/vehicles/1']}
    >
      <AuthProvider>

        <Routes>

          <Route
            path="/vehicles/:vehicleId"
            element={<VehicleDetails />}
          />

        </Routes>

      </AuthProvider>
    </MemoryRouter>
  )
}


/* =========================================================
   VEHICLE NAME HELPER
========================================================= */

const findVehicleName = async () => {
  expect(
    await screen.findByText('Toyota'),
  ).toBeInTheDocument()

  expect(
    screen.getByText('Camry'),
  ).toBeInTheDocument()
}


/* =========================================================
   TESTS
========================================================= */

describe('VehicleDetails', () => {

  beforeEach(() => {

    vi.clearAllMocks()

    localStorage.clear()


    /* -------------------------------------------------------
       AUTH USER

       We use ADMIN so that delete testing is possible.
    ------------------------------------------------------- */

    mockGetCurrentUser.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      role: 'ADMIN',
    })


    /* -------------------------------------------------------
       GET VEHICLE
    ------------------------------------------------------- */

    mockGetVehicle.mockResolvedValue(vehicle)


    /* -------------------------------------------------------
       PURCHASE
    ------------------------------------------------------- */

    mockPurchaseVehicle.mockResolvedValue({
      vehicle: {
        ...vehicle,
        quantity: 4,
      },
    })


    /* -------------------------------------------------------
       RESTOCK
    ------------------------------------------------------- */

    mockRestockVehicle.mockResolvedValue({
      vehicle: {
        ...vehicle,
        quantity: 6,
      },
    })


    /* -------------------------------------------------------
       DELETE
    ------------------------------------------------------- */

    mockDeleteVehicle.mockResolvedValue({
      message:
        'Vehicle deleted successfully',
    })

  })


  /* =========================================================
     TEST 1
     LOAD VEHICLE
  ========================================================= */

  it(
    'loads and displays vehicle details',
    async () => {

      renderVehicleDetails()

      await findVehicleName()


      expect(
        screen.getByText('Toyota'),
      ).toBeInTheDocument()


      expect(
        screen.getByText('Camry'),
      ).toBeInTheDocument()


      expect(
        screen.getByText(
          /₹\s*20,000/,
        ),
      ).toBeInTheDocument()


      expect(
        screen.getByText(
          /Category:\s*sedan/i,
        ),
      ).toBeInTheDocument()


      /*
       * Stock appears twice:
       *
       * In Stock: 5
       * Stock: 5
       *
       * Therefore use getAllByText().
       */

      expect(
        screen.getAllByText(
          /Stock:\s*5/i,
        ),
      ).toHaveLength(2)


      expect(
        screen.getByRole('button', {
          name: /purchase 1/i,
        }),
      ).toBeInTheDocument()

    },
  )


  /* =========================================================
     TEST 2
     PURCHASE VEHICLE
  ========================================================= */

  it(
    'purchases a vehicle and updates quantity',
    async () => {

      renderVehicleDetails()

      await findVehicleName()


      const purchaseButton =
        screen.getByRole('button', {
          name: /purchase 1/i,
        })


      fireEvent.click(
        purchaseButton,
      )


      await waitFor(() => {

        expect(
          mockPurchaseVehicle,
        ).toHaveBeenCalledWith(
          1,
          1,
        )

      })


      await waitFor(() => {

        expect(
          screen.getAllByText(
            /Stock:\s*4/i,
          ),
        ).toHaveLength(2)

      })

    },
  )


  /* =========================================================
     TEST 3
     RESTOCK VEHICLE
  ========================================================= */

  it(
    'restocks a vehicle successfully',
    async () => {

      renderVehicleDetails()

      await findVehicleName()


      const restockButton =
        screen.getByRole('button', {
          name: /restock 1/i,
        })


      fireEvent.click(
        restockButton,
      )


      await waitFor(() => {

        expect(
          mockRestockVehicle,
        ).toHaveBeenCalledWith(
          1,
          1,
        )

      })


      await waitFor(() => {

        expect(
          screen.getAllByText(
            /Stock:\s*6/i,
          ),
        ).toHaveLength(2)

      })

    },
  )


  /* =========================================================
     TEST 4
     DELETE CANCELLED
  ========================================================= */

  it(
    'does not delete when confirmation is cancelled',
    async () => {

      renderVehicleDetails()

      await findVehicleName()


      const confirmSpy =
        vi
          .spyOn(window, 'confirm')
          .mockReturnValue(false)


      fireEvent.click(
        screen.getByRole('button', {
          name: /delete vehicle/i,
        }),
      )


      expect(
        confirmSpy,
      ).toHaveBeenCalled()


      expect(
        mockDeleteVehicle,
      ).not.toHaveBeenCalled()


      confirmSpy.mockRestore()

    },
  )


  /* =========================================================
     TEST 5
     DELETE VEHICLE
  ========================================================= */

  it(
    'deletes a vehicle after confirmation',
    async () => {

      renderVehicleDetails()

      await findVehicleName()


      const confirmSpy =
        vi
          .spyOn(window, 'confirm')
          .mockReturnValue(true)


      fireEvent.click(
        screen.getByRole('button', {
          name: /delete vehicle/i,
        }),
      )


      await waitFor(() => {

        expect(
          mockDeleteVehicle,
        ).toHaveBeenCalledWith(
          1,
        )

      })


      expect(
        mockDeleteVehicle,
      ).toHaveBeenCalledTimes(1)


      confirmSpy.mockRestore()

    },
  )


  /* =========================================================
     TEST 6
     INVALID VEHICLE ID
  ========================================================= */

  it(
    'shows an error for an invalid vehicle ID',
    async () => {

      render(
        <MemoryRouter
          initialEntries={[
            '/vehicles/abc',
          ]}
        >

          <AuthProvider>

            <Routes>

              <Route
                path="/vehicles/:vehicleId"
                element={
                  <VehicleDetails />
                }
              />

            </Routes>

          </AuthProvider>

        </MemoryRouter>,
      )


      await waitFor(() => {

        expect(
          screen.getByText(
            /Invalid vehicle ID/i,
          ),
        ).toBeInTheDocument()

      })


      expect(
        mockGetVehicle,
      ).not.toHaveBeenCalled()

    },
  )


  /* =========================================================
     TEST 7
     VEHICLE NOT FOUND
  ========================================================= */

  it(
    'shows vehicle not found when API returns no vehicle',
    async () => {

      mockGetVehicle.mockResolvedValue(
        null,
      )


      renderVehicleDetails()


      await waitFor(() => {

        expect(
          screen.getByText(
            /Vehicle not found/i,
          ),
        ).toBeInTheDocument()

      })

    },
  )

})