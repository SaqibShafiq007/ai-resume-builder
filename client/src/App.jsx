
import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import api from './configs/api'
import { useDispatch } from 'react-redux'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'
function App() {
  const dispatch = useDispatch()

  /**
   * Fetch user data if token exists
   * Keeps user logged in on page reload
   */
  const getUserData = async () => {
    const token = localStorage.getItem('token')
    console.log('token:', token) // ✅ check token exists
    
    try {
      if (token) {
        const { data } = await api.get(
          '/api/users/data',
          { headers: { Authorization: token } }
        )

        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    } 
  }
  
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
    <Toaster/>
       <Routes>
          <Route path='/' element = {<Home/>}/>

          <Route path='app' element = {<Layout/>}>
            <Route index element = {<Dashboard/>}/>
            <Route path='builder/:resumeId' element = {<ResumeBuilder/>}/>
          </Route>

          <Route path='view/:resumeId' element = {<Preview/>}/>
          
       </Routes>
    
    </>
  )
}

export default App

/*
If something has children inside it → opening + closing tag
**If something has no children → self closing /> **
*/