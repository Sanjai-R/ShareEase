import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import { addSubscription, getSubscriptionByUser } from '../API/Subscription';
import { getAllCategory, getCategories } from '../API/category';
import { imgUrls } from '../utils/imgConst';
import UseAuth from '../customHooks/UseAuth';
const Category = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subscription, setSubscription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const { data } = UseAuth();
  const [subscriptionId, setSubscriptionId] = useState([]);
  const fetchData = async () => {
    const res = await getSubscriptionByUser(data.userId);

    if (res.status) {
      setSubscription(res.data);
      console.log(subscription);
    }
    const category = await getCategories();
    if (category.status) {
      setCategory(category.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [data]);
  const categoryIds = subscription.map(item => item.category.id);
  console.log(categoryIds);
  const basicBoxStyles = {
    cursor: 'pointer',
    boxSize: '250px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    borderRadius: 'md',
    color: 'white',
    px: '4',
    transition: '0.3s ease-in',
  };
  const toast = useToast();
  const addCategory = () => {
    console.log(data.userId);
    if (data) {
      subscriptionId.forEach(async id => {
        const res = await addSubscription(id, data.userId);
        if (!res.status) {
          toast({
            title: 'Error',
            description: res.message,
            status: 'error',
          });
        }
      });
      window.location.reload();
    }

    onClose();
  };
  return (
    <Box m={4} bg="#fff" p={2} borderRadius="md">
      <Heading size="lg">Category</Heading>
      <Flex alignItems="center" gap={4} m={2}>
        {loading ? (
          <Text>Loading</Text>
        ) : subscription.length === 0 ? (
          <Text>No Subscription</Text>
        ) : (
          subscription.map((item, index) => (
            <Box
              {...basicBoxStyles}
              background={`url(${
                imgUrls[item.category.name.toUpperCase()]
              }) center/cover no-repeat`}
              filter="grayscale(90%)"
              _hover={{
                filter: 'grayscale(0%)',
              }}
            >
              {item.category.name}
            </Box>
          ))
        )}

        <Box
          {...basicBoxStyles}
          border="3px dashed"
          borderColor="gray.400"
          color="gray.400"
          onClick={onOpen}
        >
          <HiOutlineFolderAdd color="gray.400" fontSize="48px" />
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size="md" fontWeight="700">
                Add Category
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box overflowY="scroll" maxH="400px" w="100%">
                <Flex
                  flexWrap="wrap"
                  gap="5px"
                  justifyContent="center"
                  w="100%"
                >
                  {loading ? (
                    <Text>Loading</Text>
                  ) : category.length === 0 ? (
                    <Text>No Subscription</Text>
                  ) : (
                    category.map((item, index) => {
                      if (categoryIds.includes(item.id)) {
                        return null;
                      } else {
                        return (
                          <Box
                            onClick={() => {
                              if (subscriptionId.includes(item.id)) {
                                setSubscriptionId(
                                  subscriptionId.filter(id => id !== item.id)
                                );
                              } else {
                                setSubscriptionId([...subscriptionId, item.id]);
                              }
                            }}
                            {...basicBoxStyles}
                            background={`url(${
                              imgUrls[item.name.toUpperCase()]
                            }) center/cover no-repeat`}
                            filter={
                              subscriptionId.includes(item.id)
                                ? 'grayscale(0%)'
                                : 'grayscale(90%)'
                            }
                            _hover={{
                              filter: 'grayscale(0%)',
                            }}
                          >
                            <Text>{item.name}</Text>
                          </Box>
                        );
                      }
                    })
                  )}
                </Flex>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={() => addCategory()}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default Category;
