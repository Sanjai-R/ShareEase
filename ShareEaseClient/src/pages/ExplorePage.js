import {
  Box,
  Flex,
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
import UseAuth from '../customHooks/UseAuth';
import { getAllRequest } from '../API/Request';
const ExplorePage = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [requestedData, setRequestedData] = useState([]);
  const [query, setQuery] = useState('');
  const { data: AuthData } = UseAuth();
  useEffect(() => {
    fetchData();
  }, [AuthData]);

  const fetchData = async () => {
    const resourceData = await getAllResource();
    const categoryData = await getCategories();
    const requestData = await getAllRequest();

    if (resourceData.status && categoryData.status && requestData.status) {
      setResources(resourceData.data);
      setCategories(categoryData.data);
      setRequestedData(requestData.data);
      setLoading(false);
    } else {
      console.log('error');
    }
  };
  const requested = AuthData
    ? requestedData.filter(
        e => e.borrowerId === AuthData.userId && e.status !== 'pending'
      )
    : [];
  const requestedIds = requested.map(e => e.resourceId);

  const filteredResources = matchSorter(resources, category, {
    keys: ['category.name'],
  });

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
              onChange={e => setQuery(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Flex gap={5} alignItems="center">
          <Box
            onClick={() => {
              setCategory('');
            }}
            bg={category === '' ? '#F3F6F8' : '#fff'}
            color={category === '' ? 'gray.700' : 'blackAlpha.700'}
            p={2}
            cursor="pointer"
            borderRadius="md"
            fontWeight="medium"
          >
            <Text>Discover</Text>
          </Box>

          {categories.map(cat => (
            <Box
              bg={cat.name === category ? '#F3F6F8' : '#fff'}
              onClick={() => {
                setCategory(cat.name);
              }}
              color={cat.name === category ? 'gray.700' : 'blackAlpha.700'}
              p={2}
              borderRadius="md"
              cursor="pointer"
              fontWeight="medium"
            >
              <Text>{cat.name}</Text>
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
            {matchSorter(filteredResources, query, {
              keys: ['name', 'location', 'description'],
            }).map(resource => {
              if (
                resource.userId !== AuthData.userId &&
                resource.availability !== 'borrowed'
              ) {
                return (
                  <ExploreCard
                    data={resource}
                    isRequested={requestedIds.includes(resource.id)}
                  />
                );
              }
              return null;
            })}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};
export default ExplorePage;
