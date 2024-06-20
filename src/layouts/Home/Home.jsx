import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../routes'
import { colors } from '../../assets'

function Home() {
  return (
    <Grid container spacing={2} sx={{ bgcolor: colors.background }}>
          <Grid item xs={2.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={9.5} sx={{ p: "15px" }}>
            <Routes>
              {routes?.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {/* Render nested routes */}
                  {route.children &&
                    route.children.map((childRoute, childIndex) => (
                      <Route
                        key={childIndex}
                        path={`${childRoute.path}`}
                        element={childRoute.element}
                      />
                    ))}
                </Route>
              ))}
            </Routes>
          </Grid>
        </Grid>
  )
}

export default Home