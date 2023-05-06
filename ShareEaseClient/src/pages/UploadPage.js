import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getCategories } from '../API/category';
import UseAuth from '../customHooks/UseAuth';
import { PostResource } from '../API/resource';
import { Navigate, useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: '',
    location: '',
    availability: '',
    category: '',
  });
  const { data } = UseAuth();

  const toast = useToast();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    let data = await getCategories();
    if (data.status) {
      setCategories(data.data);
      
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const { name, description, img, location, category } =
      formData;
   
    if (!name || !description || !img || !location || !category) {
      toast({
        title: `Check your inputs`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    } else {
      const res = await PostResource({
        ...formData,
        categoryId: category,
        userId: data.userId,
      });

      if (res.status) {
        toast({
          title: `Resource uploaded successfully`,
          status: 'success',
          isClosable: true,
          position: 'top-right',
        });
        setFormData({
          name: '',
          description: '',
          img: '',
          location: '',
          availability: '',
          category: '',
        });
        navigate('/profile');
      } else {
        toast({
          title: `Something went wrong`,
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };
  const [value, setValue] = useState('');
  const maxLength = 100;
  const remainingWords = maxLength - value.split(' ').length;
  return (
    <Box bg="gray.100" overflowY="scroll" height="100vh">
      <Center flexDirection="column">
        <Stack
          rounded="lg"
          p={8}
          w="70%"
          bg="white"
          overflow="hidden"
          my={4}
          //   spacing={4}
        >
          <Heading>Upload your Resource</Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl id="name" mb={2} size="xs">
              <FormLabel>Name:</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your Resource Name"
              />
            </FormControl>

            <FormControl id="description" mb={2} size="xs">
              <FormLabel>Description:</FormLabel>

              <Textarea
                type="text"
                name="description"
                maxLength={maxLength}
                maxWording={`Remaining words: ${remainingWords}`}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter your Resource Description"
              />
              <Text fontSize="sm" color="gray.500">
                Maximum words: {maxLength}
              </Text>
            </FormControl>
            <FormControl id="category" mb={2} size="xs">
              <FormLabel>Category:</FormLabel>
              <Select
                id="category"
                value={formData.category}
                name="category"
                onChange={handleInputChange}
                placeholder="Select category"
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, i) => (
                    <option key={i} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl id="img" mb={2} size="xs">
              <FormLabel>Image URL:</FormLabel>
              <Input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                placeholder="Enter the URL of your Resource Image"
              />
            </FormControl>

            <FormControl id="location" mb={2} size="xs">
              <FormLabel>Location:</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter the Location of your Resource"
              />
            </FormControl>

            <Button type="submit" w="full" colorScheme="brand">
              Submit
            </Button>
          </form>
        </Stack>
      </Center>
    </Box>
  );
};

export default UploadForm;
