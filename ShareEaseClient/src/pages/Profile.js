import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { matchSorter } from 'match-sorter';
import React, { useState, useEffect } from 'react';
import { getAllResource } from '../API/resource';
import UseAuth from '../customHooks/UseAuth';
import { BsSearch } from 'react-icons/bs';
import ResourceCard from '../components/ResourceCard';
import Category from '../container/Category';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);

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
  };

  return (
    <Box overflowY="scroll" height="calc(100vh - 32px)">
      {/* <Flex
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
      </Flex> */}
      <Category />
      <Box>
        <Heading size="lg" m={4}>
          Your Resources
        </Heading>
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
            {matchSorter(resources, AuthData.userId, {
              keys: ['userId'],
            }).map(resource => (
              <ResourceCard data={resource} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};
export default ProfilePage;
