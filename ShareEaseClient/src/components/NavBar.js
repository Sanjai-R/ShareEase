import {
  Avatar,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';

const NavBar = () => {
  const [isLogged, setIsLogged] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = React.useState({});
  const navItems = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Items',
      path: '/items',
    },
  ];
  useEffect(() => {
    const userData = localStorage.getItem('profile');
    if (JSON.parse(userData)) {
      setIsLogged(true);
      setUserData(JSON.parse(userData));
    }
  }, []);
  console.log(isLogged && userData.role);
  const handleLogout = () => {
    onClose(); // Close the logout confirmation modal
    localStorage.clear('profile');
    window.location.reload();
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="#fff"
      px="10"
      py="2"
      w="100%"
    >
      <Heading fontWeight="800" fontSize="xl">
        ShareEase
      </Heading>

      <Flex gap={3} alignItems="center">
        {navItems.map((item, i) => (
          <Link to={item.path} key={item.title}>
            <Text
              fontSize="sm"
              style={{
                cursor: 'pointer',
                color: '#52525b',
              }}
              key={i}
              _hover={{ color: 'brand.500' }}
            >
              {item.title}
            </Text>
          </Link>
        ))}
      </Flex>
      {isLogged ? (
        <>
          <Button onClick={onOpen}>Logout</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Logout Confirmation</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to logout?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="brand" mr={3} onClick={handleLogout}>
                  Logout
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Flex gap={2}>
          <Auth isLoginContainer={true} />
          <Auth />
        </Flex>
      )}
    </Flex>
  );
};
export default NavBar;
