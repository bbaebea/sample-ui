import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginAPI } from '../api/auth'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import { toast } from 'react-toastify'

export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        loginAPI({
            name,
            password,
        }).then(res => {
            if(res?.ok){
                setCookie("AUTH_TOKEN", res.data.token)
                dispatch(login(res.data))
                navigate("/")
                toast.success(res?.message ?? "Logged in successfully.")
            }
            else{
                toast.error(res?.message ?? "Something went wrong")
            }
        })
    }

  return (
    <Box sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{minHeight: 250, width: 500, boxShadow: 'black 0px 0px 20px', borderRadius: 2}}>
            <Typography variant="h4" sx={{textAlign: 'center', mt: 2}}>
                Login
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{width: 300, mx: 'auto'}}>
                <Box sx={{mt: 1}}>
                    <TextField onChange={(e) => setName(e.target.value)} value={name} fullWidth size="small" label="Username" />
                </Box>
                <Box sx={{mt: 1}}>
                    <TextField  onChange={(e) => setPassword(e.target.value)} value={password} fullWidth size="small" label="Password" type="password" />
                </Box>
                <Box sx={{mt: 1, textAlign: 'center'}}>
                    <Button type="submit" variant="contained">Login</Button>
                </Box>
            </Box>
            <Box sx={{mt: 2, textAlign: 'center'}}>

                <Link to="/register">
                    <Typography>
                        Don't have an account yet?
                    </Typography>
                </Link>
            </Box>
        </Box>
    </Box>
  )
}
