import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import ExploreCard from '../components/ExploreCard';
import { getRecommendation } from '../API/resource';
import { useEffect, useState } from 'react';
import UseAuth from '../customHooks/UseAuth';
import { Link } from 'react-router-dom';
function Home() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);

  const { data: AuthData } = UseAuth();
  useEffect(() => {
    fetchData();
  }, [AuthData]);

  const fetchData = async () => {
    const resourceData = await getRecommendation(AuthData.userId);

    if (resourceData.status) {
      setResources(resourceData.data);
      setLoading(false);
    } else {
      console.log('error');
    }
  };
  const features = [
    {
      title: 'Recommendations',
      content:
        "We provide personalized recommendations to our users based on their interests and preferences. Our platform analyses the user's behaviour and recommends resources that are relevant to them, which helps them discover new resources that they may have otherwise missed.",
    },
    {
      title: 'Notification',
      content:
        'Our platform provides notifications to users when relevant content is posted, approved, or requested. Users can stay up to date with the latest content and never miss an opportunity to access a valuable resource.',
    },

    {
      title: 'Downloadable Invoice',
      content:
        'We provide our users with downloadable invoice statements in PDF/CSV format. Users can easily download and access their invoices, which helps them manage their expenses and keep track of their spending on our platform.',
    },
  ];
  return (
    <Box overflowY="scroll" h="100vh">
      <Box h="calc(100vh-72px)" m={4}>
        <Box bg="#446EE7" borderRadius="md" color="#fff" w="full" py={8} px={4}>
          <Flex mx="auto" w="100%" mt={4} align="center">
            <Box w="full">
              <Heading fontSize="4xl" fontWeight="bold" mb={4}>
                Share and Grow Together
              </Heading>
              <Heading fontSize="xl" mb={2}>
                Collaborate and exchange knowledge to expand your horizons
              </Heading>

              <Button
                variant="outline"
                bg="#ffff"
                color="#446EE7"
                mt={8}
                size="lg"
                as={Link}
                to="/explore"
              >
                Get Started
              </Button>
            </Box>
            {/* <Image src={banner} boxSize="250px" objectFit="cover" /> */}
          </Flex>
        </Box>
        {/* Recommended Products */}
        <Container maxW="container.lg" mt="8">
          <Heading mb="8" size="lg">
            Recommended Products
          </Heading>

          {loading ? (
            <div>Loading...</div>
          ) : resources.length === 0 ? (
            <p>No Resource found.</p>
          ) : (
            <SimpleGrid
              spacing={4}
              m={4}
              templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            >
              {resources.map(resource => {
                if (
                  resource.userId !== AuthData.userId &&
                  resource.availability !== 'borrowed'
                ) {
                  return (
                    <ExploreCard
                      data={resource}
                      // isRequested={requestedIds.includes(resource.id)}
                    />
                  );
                }
                return null;
              })}
            </SimpleGrid>
          )}
          {/* Add more product boxes here */}
        </Container>
        <Box bg="gray.100" py="12" px={4} w="100%">
          <Heading size="lg" mb="8">
            Why Choose SHAREASE?
          </Heading>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '8', md: '12' }}
          >
            {features.map(feature => (
              <Box
                flex="1"
                borderRadius="md"
                p={6}
                bg="white"
                transition="background-color 0.2s, box-shadow 0.2s"
              >
                <Heading color="brand.500" size="md" fontWeight="bold" mb={4}>
                  {feature.title}
                </Heading>
                <Text textAlign="justify" fontSize="md">
                  {feature.content}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
