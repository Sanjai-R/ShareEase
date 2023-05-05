import {
  Avatar,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Icon,
  Image,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UseAuth from '../customHooks/UseAuth';
import { getContributions, getUserPoint } from '../utils/badgePointCalc';
import { levelUpData } from '../utils/LevelUpData';

const BadgeContainer = () => {
  const { data } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [badgeData, setBadgeData] = useState({});
  const [currentLevel, setCurrentLevel] = useState('');
  const [nextLevel, setNextLevel] = useState('');
  const [pointToReachNextLevel, setPointToReachNextLevel] = useState(0);
  useEffect(() => {
    fetchData();
  }, [data]);
  const getLevel = () => {
    let current = 'level1';
    let next = 'level2';
    if (badgeData) {
      let pointsToNextLevel = levelUpData[nextLevel] - badgeData?.points;

      for (let level in levelUpData) {
        if (badgeData?.points >= levelUpData[level]) {
          current = level;
        } else {
          next = level;
          pointsToNextLevel = levelUpData[nextLevel] - badgeData?.points;
          break;
        }
      }
      setNextLevel(next);
      console.log(current);
      setCurrentLevel(current);
      setPointToReachNextLevel(pointsToNextLevel);
    }
  };
  const fetchData = async () => {
    if (data) {
      const res = await getUserPoint(data?.userId);
      const temp = await res.find(obj => obj.user.user_id === data?.userId);
      setBadgeData(temp);
      console.log(res);
      getLevel();
      setLoading(false);
    }
  };
  return loading ? (
    <CircularProgress isIndeterminate color="brand.500" />
  ) : (
    <Flex
      my={4}
      w="600px"
      bg="#fff"
      borderRadius="md"
      p={4}
      h="200px"
      gap="5"
      alignItems="center"
    >
      <Avatar name={data?.username} size="lg" borderRadius="lg" />
      <Flex w="full" direction="column" gap={1} alignItems="flex-start">
        <Heading fontSize="28px" fontWeight="bold">
          Welcome, {data?.username}👋
        </Heading>
        <Flex gap="4">
          <Text fontSize="20px" fontWeight="600">
            Beginner
          </Text>
          <Text fontSize="20px" fontWeight="600">
            {badgeData?.points}XP
          </Text>
        </Flex>
        <Box w="full">
          <Flex w="full" mb="2" justifyContent="space-between">
            <Text>{currentLevel}</Text>
            <Text>{nextLevel}</Text>
          </Flex>
          <Progress
            borderRadius="full"
            size="md"
            value={badgeData?.points}
            colorScheme="brand"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default BadgeContainer;
