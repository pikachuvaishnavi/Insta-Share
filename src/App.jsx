import {Routes, Route} from 'react-router'

import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}
export default App
