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
} from '@chakra-ui/react';
import UseAuth from '../customHooks/UseAuth';
import React from 'react';
import moment from 'moment';
import { postRequest } from '../API/Request';
import { useNavigate } from 'react-router-dom';
const ExploreCard = ({ data, isRequested = false }) => {
  const { id, name, description, img, location, availability } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: authData } = UseAuth();
  const navigate = useNavigate();
  const handleRequest = async () => {
    const now = moment();

    const res = await postRequest({
      resourceId: id,
      borrowerId: authData.userId,
      date: now.format(),
    });
    if (res.status) {
      navigate('/dashboard');
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
        <Button
          w="full"
          colorScheme={isRequested ? 'red' : 'brand'}
          isDisabled={isRequested}
          onClick={onOpen}
        >
          {isRequested ? 'Requested' : 'Request'}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" fontWeight="700">
                Request Confirmation
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you confirm this request </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={handleRequest}>
                Request
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

export default ExploreCard;
