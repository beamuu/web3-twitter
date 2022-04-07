import { Box, Button, Center, Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connector, hooks } from "../connectors/metamask";

const Login: NextPage = () => {
  const router = useRouter();
  const { useIsActive, useAccount } = hooks;
  const active = useIsActive();
  const account = useAccount();
  const [loading, setLoading] = useState(false);

  async function handleSignin() {
    setLoading(true);
    await connector.activate(97);
  }

  useEffect(() => {
    if (active && account) {
      router.push("/home");
    }
    else {
      setLoading(false);
    }
  }, [active, account]);

  return (
    <>
      <Head>
        <title>Twitter - Login</title>
      </Head>
      <Container maxW="container.lg">
        <Center minH="100vh">
          <Box textAlign="center">
            <Heading>Login to Web3 Twitter</Heading>
            <Button
              my="40px"
              w="full"
              colorScheme="twitter"
              h="60px"
              fontWeight={500}
              fontSize="1.2rem"
              onClick={handleSignin}
              isLoading={loading}
            >
              Login with MetaMask
            </Button>
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default Login;
