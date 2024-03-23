import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { register } from '../api/auth'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'

export default function Register() {

    const [warnings, setWarnings] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies()
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        if(!loading){
            const body = {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
                first_name: $("#first_name").val(),
                middle_name: $("#middle_name").val(),
                last_name: $("#last_name").val(),
                birth_date: $("#birth_date").val(),
            }
            setLoading(true)
            register(body).then(res => {
                if(res?.ok){

                    toast.success(res?.message ?? "Account has been registered")
                    setCookie("AUTH_TOKEN", res.data.token)
                    dispatch(login(res.data))
                    navigate("/")
                }
                else{
                    toast.error(res?.message ?? "Something went wrong.")
                    setWarnings(res?.errors)
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <Box sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{minHeight: 250, width: 500, boxShadow: 'black 0px 0px 20px', borderRadius: 2}}>
                <Typography variant="h4" sx={{textAlign: 'center', mt: 2}}>
                    Register
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{width: 300, mx: 'auto'}}>
                    <Box sx={{mt: 1}}>
                        <TextField required id="name" fullWidth size="small" label="Username" />
                        {
                            warnings?.name ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.name}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField required id="email" fullWidth size="small" label="Email" type="email" />
                        {
                            warnings?.email ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.email}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField required id="password" fullWidth size="small" label="Password" type="password" />
                        {
                            warnings?.password ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.password}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField required id="password_confirmation" fullWidth size="small" label="Repeat Password" type="password" />
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField required id="first_name" fullWidth size="small" label="First Name" />
                        {
                            warnings?.first_name ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.first_name}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField id="middle_name" fullWidth size="small" label="Middle Name" />
                        {
                            warnings?.middle_name ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.middle_name}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField required id="last_name" fullWidth size="small" label="Last Name" />
                        {
                            warnings?.last_name ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.last_name}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1}}>
                        <TextField required id="birth_date" fullWidth size="small" type="date"/>
                        {
                            warnings?.birth_date ? (
                                <Typography sx={{fontSize: 12}} component="small" color="error">{warnings.birth_date}</Typography>
                            ) : null
                        }
                    </Box>
                    <Box sx={{mt: 1, textAlign: 'center'}}>
                        <Button disabled={loading} type="submit" variant="contained">Register</Button>
                    </Box>
                </Box>
                <Box sx={{mt: 2, textAlign: 'center'}}>

                    <Link to="/login">
                        <Typography>
                            Already have an account
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
  )
}
