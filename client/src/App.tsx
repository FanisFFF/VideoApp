import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import MainLayout from './components/layout/Layout'
import AuthLayout from './components/layout/AuthLayout'
import SearchPage from './pages/SearchPage'
import LikedPage from './pages/LikedPage'


function App() {

  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route index element={<HomePage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:id" element={<WatchPage />} />
      </Route>

      <Route element={<AuthLayout/>}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      {/* <Route path="/:username/:post" element={<PostPage />} /> */}
      {/* <Route path="/notifications" element={<NotificationPage />} /> */}
      {/* <Route path="/search" element={<SearchPage />} /> */}
      {/* <Route path="/:username" element={<ProfilePage />} /> */}
    </Routes>

  )
}

export default App
