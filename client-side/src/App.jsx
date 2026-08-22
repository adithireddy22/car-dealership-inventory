import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import AddVehicle from './pages/AddVehicle'
import VehicleList from './pages/VehicleList'
import VehicleDetails from './pages/VehicleDetails'

import ProtectedRoute from './routes/ProtectedRoute'

import { useAuth } from './context/AuthContext'

function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>

      <p>You are authenticated.</p>

      {user && (
        <div>
          <p>
            Username: {user.username}
          </p>

          <p>
            Email: {user.email}
          </p>

          <p>
            Role: {user.role}
          </p>
        </div>
      )}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Vehicle List */}

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        {/* Protected Add Vehicle */}

        <Route
          path="/vehicles/add"
          element={
            <ProtectedRoute>
              <AddVehicle />
            </ProtectedRoute>
          }
        />

        {/* Protected Vehicle Details */}

        <Route
          path="/vehicles/:vehicleId"
          element={
            <ProtectedRoute>
              <VehicleDetails />
            </ProtectedRoute>
          }
        />

        {/* Default route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Unknown route */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App