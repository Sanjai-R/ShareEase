import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import UseAuth from '../customHooks/UseAuth';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteResource } from '../API/resource';
const ResourceCard = ({ data }) => {
  const { id, name, description, img, location, availability } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: authData } = UseAuth();
  const toast = useToast();
  const handleRequest = async () => {
    const res = await deleteResource(id);
    if (res.status) {
      toast({
        title: `Resource deleted successfully`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
      window.location.reload();
    } else {
      toast({
        title: `Something went wrong`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <Card boxShadow="md">
      <Flex direction="column" p={3} gap={3} textAlign="left">
        <Image src={img} alt={name} borderRadius="md" h="200px" />
        <Flex alignItems="center" justifyContent="space-between" w="full">
          <Heading size="sm" fontWeight="700">
            {name}
          </Heading>
          <Badge colorScheme={availability === 'borrowed' ? 'red' : 'green'}>
            <Text>{availability}</Text>
          </Badge>
        </Flex>
        <Flex>
          <Text fontWeight="700">Location: </Text>
          <Text>{location}</Text>
        </Flex>
        <Text>{description}</Text>
        <Flex gap="5px" w="100%">
          {availability !== 'borrowed' && (
            <Button
              w="50%"
              as={Link}
              to={`/EditResource/${id}`}
              colorScheme="gray"
            >
              Edit
            </Button>
          )}

          <Button
            w={availability === 'borrowed' ? 'full' : '50%'}
            colorScheme="red"
            onClick={onOpen}
          >
            Delete
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" fontWeight="700">
                Delete Confirmation
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text> Are you sure you want to delete this resource? </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleRequest}>
                Delete
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Card>
  );
};

export default ResourceCard;
