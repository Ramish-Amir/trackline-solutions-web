import { Box } from '@mui/material'
import React from 'react'
import { colors } from '../../assets'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import './Sidebar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate()

    const sidebarItems = [
        {
            label: 'Dashboard',
            to: '/',
            icon: <DashboardIcon />
        },
        {
            label: 'Trips',
            to: '/trips',
            icon: <ModeOfTravelIcon />
        },
        {
            label: 'Vehicles',
            to: '/vehicles',
            icon: <DirectionsCarIcon />
        },
        {
            label: 'Drivers',
            to: '/users',
            icon: <GroupIcon />
        }
    ]
  return (
    <Box
    sx={{ bgcolor: colors.primary, 
        m: "15px", 
        px: "10px", 
        py: "15px",
        borderRadius: "25px",
        minHeight: "calc(100vh - 30px - 30px)",
        color: colors.textLight,
        position: "static"
    }}
    >
        <Box sx={{
            textAlign: "center",
            alignContent: "center",
            fontSize: "20px",
            borderBottom: `1px solid ${colors.textLight}`,
            p: "10px 0 20px",
            mb: "20px",
            cursor: "pointer"
        }}
        onClick={() => navigate('/')}
        >
            <strong>Trackline Solutions</strong>
        </Box>
        
        {
            sidebarItems?.map((item, index) => (
                    <NavLink
                    className={({ isActive, isPending }) =>
                        isPending ? "sidebarItem active" : isActive ? "sidebarItem active" : "sidebarItem"
                      }
                    key={index} to={item.to}>
                        <div className='item-icon'>{item.icon}</div>
                        <span>{item.label}</span>
                    </NavLink>
            ))
        }

    </Box>
  )
}

export default Sidebar