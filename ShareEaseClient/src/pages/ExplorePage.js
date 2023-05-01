import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { matchSorter } from 'match-sorter';
import React, { useState, useEffect } from 'react';
import ExploreCard from '../components/ExploreCard';
import { getAllResource } from '../API/resource';
import { getCategories } from '../API/category';
import { BsSearch } from 'react-icons/bs';
import UseAuth from '../hooks/UseAuth';
const ExplorePage = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const { data: AuthData } = UseAuth();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = await getAllResource();
    if (data.status) {
      setResources(data.data);
      setLoading(false);
    } else {
      console.log('error');
    }
    data = await getCategories();
    if (data.status) {
      setCategories(data.data);
      setLoading(false);
      console.log(data.data);
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <Flex
        w="full"
        bg="#fff"
        boxShadow="sm"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        position="sticky"
        top="0"
        zIndex="999"
      >
        <Box w="30%">
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none" children={<BsSearch />} />
            <Input
              bg="#F3F6F8"
              size="md"
              variant="filled"
              placeholder="Enter query"
              // onChange={e => setQuery(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Flex gap={5}>
          {categories.map(cat => (
            <Box
              bg={cat.name === category ? '#F3F6F8' : '#fff'}
              onClick={() => {
                setCategory(cat.name);
              }}
              p={2}
              borderRadius="md"
              cursor="pointer"
            >
              <Text fontWeight="500" size="lg">
                {cat.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
      <Box overflowY="scroll" height="calc(100vh - 72px)">
        {loading ? (
          <div>Loading...</div>
        ) : resources.length === 0 ? (
          <p>No Resource found.</p>
        ) : (
          <SimpleGrid
            spacing={4}
            m={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {matchSorter(resources, category, { keys: ['category.name'] }).map(
              resource => {
                if (resource.userId !== AuthData.userId) {
                  return <ExploreCard data={resource} />;
                }
                return null;
              }
            )}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};
export default ExplorePage;
