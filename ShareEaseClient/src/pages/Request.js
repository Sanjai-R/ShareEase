import {
  Box,
  Button,
  Heading,
  useDisclosure,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UseAuth from '../customHooks/UseAuth';
import { deleteRequest, getAllRequest, putRequest } from '../API/Request';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const { data } = UseAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchData = async () => {
    const res = await getAllRequest();
    if (res.status) {
      setRequests(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const toast = useToast();
  const triggerToast = (res, title) => {
    if (res.status) {
      toast({
        title: title,
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
      onClose();
      fetchData();
    } else {
      toast({
        title: `Something went wrong`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const approveRequest = async data => {
    const { id } = data;

    const res = await putRequest(id, { ...data, status: 'approved' });
    triggerToast(res, 'Request approved successfully');
  };
  const onDeleteModelOpen = async id => {
    const res = await deleteRequest(id);

    if (res.status) {
      toast({
        title: `Resource deleted successfully`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
      onClose();
      fetchData();
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
    <Box p={4}>
      <Box bg="#fff" p={4} borderRadius="md">
        <Heading size="lg" fontWeight="800">
          Requests for you
        </Heading>
        <Box mt="6">
          <Table variant="simple" bg="#fff">
            <Thead>
              <Tr>
                <Th color="#000" fontSize="md">
                  Resource Name
                </Th>
                <Th color="#000" fontSize="md">
                  Requested By
                </Th>
                <Th color="#000" fontSize="md">
                  Request Date
                </Th>
                <Th color="#000" fontSize="md">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map(request => {
                if (request.ownerId === data.userId) {
                  return (
                    <Tr key={request.id}>
                      <Td>{request.resource.name}</Td>
                      <Td>{request.borrower.username}</Td>
                      <Td>{new Date(request.date).toLocaleString()}</Td>
                      <Td>
                        <ButtonGroup>
                          <Button colorScheme="red" onClick={onOpen} size="sm">
                            Delete
                          </Button>
                          {request.status.toUpperCase() ===
                            'Pending'.toUpperCase() && (
                            <Button
                              colorScheme="green"
                              onClick={() => {
                                approveRequest(request);
                              }}
                              size="sm"
                            >
                              Approve
                            </Button>
                          )}
                        </ButtonGroup>
                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>
                              <Heading size="md" fontWeight="700">
                                Delete Confirmation
                              </Heading>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Text>
                                Are you sure you want to delete this Request?
                              </Text>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme="red"
                                mr={3}
                                onClick={() => {
                                  onDeleteModelOpen(request.id);
                                }}
                              >
                                Delete{' '}
                              </Button>
                              <Button variant="ghost" onClick={onClose}>
                                Cancel
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Td>
                    </Tr>
                  );
                } else {
                  return null;
                }
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Request;
