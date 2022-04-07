import {
  Box,
  Button,
  Image,
  Center,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs"

const Home: NextPage = () => {
  return (
    <Container maxW="container.lg">
      <Center minH="100vh">
        <Box>
          <HStack spacing={10} alignItems="start">
            <Image
              src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
              w="160px"
            />
            <Box>
              <Heading fontWeight={800} fontSize="3rem">
                Web3
              </Heading>
              <Heading fontWeight={800} fontSize="3rem">
                Twitter
              </Heading>
              <Heading
                fontWeight={500}
                fontSize="1.5rem"
                opacity={0.7}
                mt="30px"
              >
                The decentralized social media
              </Heading>
            </Box>
          </HStack>
          <Link href="/login">
            <Button
              my="50px"
              colorScheme="twitter"
              h="60px"
              w="full"
              fontSize="1.2rem"
              fontWeight={600}
            >
              Join us now <BsArrowUpRight size="15px" style={{marginLeft: "10px"}}/>
            </Button>
          </Link>
        </Box>
      </Center>
    </Container>
  );
};

export default Home;
