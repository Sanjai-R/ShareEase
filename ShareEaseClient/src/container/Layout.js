import React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
const Layout = () => {
  return (
    <Grid
      h="100vh"
      overflowY="hidden"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      bg="gray.100"
    >
      <GridItem rowSpan={2} colSpan={1} p={5} bg="#fff">
        <SideBar />
      </GridItem>
      <GridItem colSpan={5}>
        <Box>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};
export default Layout;
