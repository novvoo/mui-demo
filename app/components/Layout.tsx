"use client";

import { useState } from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar 
        onMenuClick={handleDrawerToggle} 
        sidebarOpen={sidebarOpen && !isMobile}
      />
      <Sidebar 
        open={sidebarOpen && !isMobile} 
        onClose={() => setSidebarOpen(false)} 
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { 
            md: sidebarOpen && !isMobile ? '240px' : 0 
          },
          mt: '64px',
          transition: theme.transitions.create(['margin-left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
