import React, { useEffect, useState } from 'react';
import { getContributions } from '../utils/badgePointCalc';
import UseAuth from '../customHooks/UseAuth';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { BiGitPullRequest } from 'react-icons/bi';
const Contribution = () => {
  const { data } = UseAuth();
  const [numApprovedRequests, setNumApprovedRequests] = useState(0);
  const [numReceivedRequests, setNumReceivedRequests] = useState(0);
  useEffect(() => {
    fetchData();
  }, [data]);
  const fetchData = async () => {
    const res = await getContributions(data?.userId);
    setNumApprovedRequests(res?.numApprovedRequests);
    setNumReceivedRequests(res?.numReceivedRequests);
    console.log(res);
  };
  //   getContributions();
  return (
    <Flex
      my={4}
      w="350px"
      bg="#11102D"
      borderRadius="md"
      p={4}
      h="200px"
      gap="5"
      mx={2}
      alignItems="flex-start"
      color="#fff"
      direction="column"
    >
      <Heading size="md">Contributions</Heading>
      <Flex alignItems="center" gap="4px">
        <BiGitPullRequest />
        <Text> No.of.Requests has been Approved</Text>
        <Text fontSize="lg" fontWeight="bold" color="#FCD34D">
          {numApprovedRequests}
        </Text>
      </Flex>
      <Flex alignItems="center" gap="4px">
        <BiGitPullRequest />
        <Text> No.of.Requests has been Received</Text>
        <Text fontSize="lg" fontWeight="bold" color="#FCD34D">
          {numReceivedRequests}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Contribution;
