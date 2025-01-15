import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtecteWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    console.log(token)

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default UserProtecteWrapper
