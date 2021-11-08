import React, { useContext, useEffect, useState } from 'react'
import { BsCheckLg, BiErrorCircle } from "react-icons/all"
import NotificationContext from '../../context/HeroContext'
import './Notification.css'


export const Notification = () => {

    const { notification }  = useContext(NotificationContext)
    const [type, setType] = useState('')
    const spinner = <div className="spinner-border text-primary" role="status"/>
    const check = <BsCheckLg className="confirmIcon me-1" /> 
    const error = <BiErrorCircle className="errorIcon me-1" />
    

    useEffect (() => {
        setType(notification.type)
    },[notification.type])
    
    if(notification.message === '') {
        return null
    }
    
    return (
        <div className=" alert d-flex justify-content-center">
            <div className="alert row col-sm-6 alert-primary alert-dismissible fade show" role="alert">
                <h3> 
                    {(type === "spinner") ? spinner 
                    : (type === "check") ? check 
                    : (type === "error") ? error : ""} 
                    {notification.message} 
                    </h3>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    );
}

export default Notification;