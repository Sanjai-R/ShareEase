import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import React from 'react';

const ExploreCard = ({ data }) => {
  const { name, description, img, location, availability } = data;

  return (
    <Card boxShadow="md">
      <Flex direction="column" p={3} gap={3} textAlign="left">
        <Image src={img} alt={name} borderRadius="md" />
        <Flex alignItems="center" justifyContent="space-between" w="full">
          <Heading size="sm" fontWeight="700">
            Psychology of Money
          </Heading>
          <Badge colorScheme="green">
            <Text>{availability}</Text>
          </Badge>
        </Flex>
        <Flex>
          <Text fontWeight="700">Location: </Text>
          <Text>{location}</Text>
        </Flex>
        <Text>{description}</Text>
        <Button w="full" colorScheme="brand">
          Request
        </Button>
      </Flex>
    </Card>
  );
};

export default ExploreCard;
