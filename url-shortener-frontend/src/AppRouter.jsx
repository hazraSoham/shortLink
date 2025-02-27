import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard/DashboardLayout";
import ShortenUrlPage from './components/ShortenUrlPage';
import PrivateRoute from './PrivateRoute';
import ErrorPage from './ErrorPage';


const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Toaster position='top-center' />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/register' element={<PrivateRoute publicPage={true}> <RegisterPage /> </PrivateRoute>} />
        <Route path='/login' element={<PrivateRoute publicPage={true}> <LoginPage /> </PrivateRoute>} />
        <Route path='/dashboard' element={<PrivateRoute publicPage={false}> <Dashboard /> </PrivateRoute>} />
        
        <Route path="/url/:shortenedLink" element={<ShortenUrlPage />} />

        <Route path="/error" element={ <ErrorPage />} />
        <Route path="*" element={ <ErrorPage message="We can't seem to find the page you're looking for"/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default AppRouter


export const SubDomainRouter = () => {
  return (
    <Routes>
      {/* <Route path="/:url" element={<ShortenUrlPage />} /> */}

    </Routes>
  )
}