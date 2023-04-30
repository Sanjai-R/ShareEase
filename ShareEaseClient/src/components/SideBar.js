import {
  VStack,
  Text,
  Icon,
  HStack,
  Heading,
  Button,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  TbSettings2,
  TbHome2,
  TbInfoSquareRounded,
  TbDashboard,
} from 'react-icons/tb'; // Import Chakra UI Icons
import { MdOutlineAnalytics } from 'react-icons/md';
const SideBar = () => {
  const links = [
    { name: 'Home', path: '/', icon: TbHome2 },
    { name: 'About', path: '/about', icon: TbInfoSquareRounded },
    { name: 'Dashboard', path: '/dashboard', icon: MdOutlineAnalytics },
    { name: 'Profile', path: '/profile', icon: TbDashboard },
    { name: 'Settings', path: '/settings', icon: TbSettings2 },
  ];
  return (
    <VStack spacing={12} align="stretch" h="100%">
      <Heading size="md" fontWeight="800" w="full" textAlign="centers">
        ShareEase
      </Heading>
      <VStack spacing={4} align="stretch">
        {links.map((link, index) => (
          <Link key={index} to={link.path}>
            <HStack
              p={2}
              borderRadius="md"
              fontWeight="medium"
              color="gray.700"
              _hover={{ color: 'brand.500', bg: 'brand.50' }}
            >
              <Icon
                as={link.icon}
                mr={2}
                boxSize={5}
                borderRadius="full" // Add rounded border to icon
              />
              <Text>{link.name}</Text>
            </HStack>
          </Link>
        ))}
      </VStack>
      <Button>Logout</Button>
    </VStack>
  );
};
export default SideBar;
