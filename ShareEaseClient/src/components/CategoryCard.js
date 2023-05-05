import { Box, Card, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { imgUrls } from '../utils/imgConst';
import UseAuth from '../customHooks/UseAuth';

const CategoryCard = ({ name }) => {
  const {data} = UseAuth()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="white"
      textShadow="0 0 20px black"
      fontWeight="bold"
      fontSize="20px"
      background={`url(${imgUrls[name.toUpperCase()]}) center/cover no-repeat`}
      filter="grayscale(80%)"
      boxSize="250px"
      px={4}
      borderRadius="md"
      cursor="pointer"
      transition="0.3s ease-in"
      _hover={{
        filter: 'grayscale(0%)',
      }}
    >
      <Text>{name}</Text>
    </Box>
  );
};

export default CategoryCard;
