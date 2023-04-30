import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Button, VStack, StackDivider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdBookmarkBorder } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
const Layout = () => {
  const slag = [
    {
      title: 'upload Books',
      link: 'upload',
      font: <AiOutlineCloudUpload style={{ fontSize: '24px' }} />,
    },
    {
      title: 'Saved books',
      link: 'savedItems',
      font: <MdBookmarkBorder style={{ fontSize: '24px' }} />,
    },
    {
      title: 'uploaded books',
      link: 'uploadedItems',
      font: <AiOutlineCloudUpload style={{ fontSize: '24px' }} />,
    },
    {
      title: 'Profile',
      link: 'profile',
      font: <CgProfile style={{ fontSize: '24px' }} />,
    },
  ];
  return (
    <Grid
      h="100vh"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
    >
      <GridItem
        rowSpan={2}
        colSpan={1}
        style={{
          padding: '10px',
          border: '1px solid #E2E8F0',
        }}
        // bg="#f3f6f8"
      >
        <SideBar />
      </GridItem>
      <GridItem colSpan={5}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};
export default Layout;
