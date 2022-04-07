import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import { FunctionComponent } from "react";

const Navbar: FunctionComponent = () => {
  return (
    <Box position="sticky" top={0} zIndex={60} bg="black">
      <Container
        maxW="container.sm"
        py="10px"
        d="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Image src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" w="30px"/>
          <Heading size="md" fontWeight={700} opacity={0.8}>
            Web3 Twitter
          </Heading>
        </HStack>
        <HStack>
          <IconButton
            aria-label="profile"
            color="white"
            bg="transparent"
            fontSize="30px"
            _hover={{
              bg: "gray.900",
            }}
            _active={{
              bg: undefined,
            }}
            icon={<MdAccountCircle />}
          ></IconButton>
        </HStack>
      </Container>
    </Box>
  );
};
export default Navbar;
