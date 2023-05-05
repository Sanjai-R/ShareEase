import {
  VStack,
  Text,
  Icon,
  HStack,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Avatar,
  Flex,
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
import { CgProfile } from 'react-icons/cg';
import { TbFileUpload } from 'react-icons/tb';
import { RiApps2Line } from 'react-icons/ri';
import { BiGitPullRequest } from 'react-icons/bi';
import { SiSlideshare } from 'react-icons/si';
import UseAuth from '../customHooks/UseAuth';
const SideBar = () => {
  const links = [
    { name: 'Home', path: '/', icon: TbHome2 },
    { name: 'Explore', path: '/explore', icon: RiApps2Line },
    { name: 'Dashboard', path: '/dashboard', icon: MdOutlineAnalytics },
    { name: 'Upload', path: '/upload', icon: TbFileUpload },
    { name: 'Profile', path: '/profile', icon: CgProfile },
    { name: 'Requests', path: '/request', icon: BiGitPullRequest },
  ];
  const { data, loading } = UseAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    onClose(); // Close the logout confirmation modal
    localStorage.clear('profile');
    window.location.reload();
  };
  return (
    <VStack spacing={6} align="stretch" h="100%">
      <Flex alignItems="center">
        <SiSlideshare size="36px" color="#446ee7" />
        <Heading
          size="lg"
          p={2}
          // fontWeight="800"
          w="full"
          bgGradient="radial-gradient(#446ee7, #87a3f8)"
          bgClip="text"
          fontWeight="900"
        >
          SHAREASE
        </Heading>
      </Flex>
      {!loading && (
        <HStack w="full">
          <Avatar size="md" name={data.username} bg="brand.500" color="#fff" />
          <Flex direction="column">
            <Text fontWeight="bold">{data.username},</Text>
            <Text fontWeight="medium">{data.location}</Text>
          </Flex>
        </HStack>
      )}

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
    </VStack>
  );
};
export default SideBar;
