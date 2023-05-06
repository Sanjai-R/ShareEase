import React, { useEffect, useState } from 'react';
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
  Avatar,
  AvatarBadge,
  Text,
} from '@chakra-ui/react';
import { getUserPoint } from '../utils/badgePointCalc';
const LeaderBoard = () => {
  const [data, setDate] = useState([]);
  const fetchData = async id => {
    const res = await getUserPoint(1);
    setDate(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box bg="#fff" p={4} borderRadius="md" mb="4">
      <Heading size="md">LeaderBoard</Heading>
      <Box mt="6">
        <Table variant="simple" bg="#fff" w="90%">
          <Thead>
            <Tr>
              <Th color="#000" fontSize="md">
                Rank
              </Th>
              <Th color="#000" fontSize="md">
                Avatar
              </Th>
              <Th color="#000" fontSize="md">
                Username
              </Th>
              <Th color="#000" fontSize="md">
                points
              </Th>
              <Th color="#000" fontSize="md">
                email
              </Th>
              <Th color="#000" fontSize="md">
                location
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((request, index) => (
              <Tr key={index}>
                <Td>
                  <Text fontWeight="medium">{index + 1} </Text>
                </Td>
                <Td>
                  <Avatar size="sm" name={request.user.username} />
                </Td>
                <Td>
                  <Text fontWeight="medium">{request.user.username} </Text>
                </Td>
                <Td>
                  <Text fontWeight="medium">{request.points} CP</Text>
                </Td>
                <Td>
                  <Text fontWeight="medium">{request.user.email} </Text>
                </Td>
                <Td>
                  <Text fontWeight="medium">{request.user.location} </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default LeaderBoard;
