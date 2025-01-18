import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserProtecteWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [ isLoading, setIsLoading ] = useState(true);

    // console.log(token)   

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.status === 200) {
                setUser(response.data.user);
                setIsLoading(false);
            }
        })
        .catch ((error) => {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/login');
        });
    }, [token]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtecteWrapper
