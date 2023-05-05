import { Flex, Text } from '@chakra-ui/react';

export default function ProgressBar({ name, percent }) {
  const width = `${percent * 100}%`;

  return (
    <div>
      <Text fontSize={['sm', 'md']}>{name}</Text>
      <Flex
        bg="gray.200"
        borderRadius="0.5rem"
        h="3px"
        maxW="350px"
        position="relative"
        alignItems="center"
      >
        <Flex
          bg="#4F46E5"
          borderRadius="1rem"
          h="100%"
          transition="2s ease"
          transitionDelay="0.5s"
          position="absolute"
          left="0"
          top="0"
          width={width}
        />
        <div
          bg="#4F46E5"
          borderRadius="45%"
          w="10px"
          h="10px"
          position="absolute"
          right="-5px"
          top="-3px"
        />
        <Text fontSize={['sm', 'md']} ml="5px">
          {percent * 100}%
        </Text>
      </Flex>
    </div>
  );
}
