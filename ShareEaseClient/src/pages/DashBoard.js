import React, { useEffect, useState } from 'react';
import { deleteRequest, getAllRequest } from '../API/Request';
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
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
  ButtonGroup,
} from '@chakra-ui/react';
import UseAuth from '../customHooks/UseAuth';
import { matchSorter } from 'match-sorter';

import PdfDownload from '../components/PdfDownload';
import PDFDownloadButton from '../components/PdfDownload';
import BadgeContainer from '../container/BadgeContaine';
import { getUserPoint } from '../utils/badgePointCalc';
import LeaderBoard from '../container/LeaderBoard';
import Contribution from '../container/Contribution';

const Dashboard = () => {
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
    <Box p="6" overflowY="scroll" h="100vh">
      <Flex>
        <BadgeContainer />
        <Contribution />
      </Flex>

      <LeaderBoard />
      <Box bg="#fff" p={4} borderRadius="md">
        <Heading size="md">Requested Resources</Heading>
        <Box mt="6">
          <Table variant="simple" bg="#fff">
            <Thead>
              <Tr>
                <Th color="#000" fontSize="md">
                  Status
                </Th>
                <Th color="#000" fontSize="md">
                  Resource Name
                </Th>
                <Th color="#000" fontSize="md">
                  Owner
                </Th>
                <Th color="#000" fontSize="md">
                  Request Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map(request => {
                if (request.borrowerId === data.userId) {
                  return (
                    <Tr key={request.id}>
                      <Td>
                        {request.status === 'approved' ? (
                          <Badge colorScheme="green">Approved</Badge>
                        ) : request.status === 'rejected' ? (
                          <Badge colorScheme="red">Rejected</Badge>
                        ) : (
                          <Badge colorScheme="yellow">Pending</Badge>
                        )}
                      </Td>
                      <Td>{request.resource.name}</Td>
                      <Td>{request.owner.username}</Td>
                      <Td>{new Date(request.date).toLocaleString()}</Td>
                      <Td>
                        <ButtonGroup>
                          {request.status !== 'approved' && (
                            <Button
                              colorScheme="red"
                              onClick={onOpen}
                              size="sm"
                            >
                              Delete
                            </Button>
                          )}

                          {request.status === 'approved' && (
                            <>
                              <PDFDownloadButton data={request} />
                              <div></div>
                            </>
                          )}
                        </ButtonGroup>
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
                              Are you sure you want to delete this Request?
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme="red"
                                mr={3}
                                onClick={() => {
                                  onDeleteModelOpen(request.id);
                                }}
                              >
                                Delete
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
export default Dashboard;
