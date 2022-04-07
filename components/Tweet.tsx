import { Avatar, Box, Heading, HStack, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { avatarIconFromAddress, shortenAddress } from "../utils/address";
import { AiFillCheckCircle } from "react-icons/ai";
interface Props {
  ipfsHash: string;
}

interface Tweet {
  timestamp: any;
  content: string;
  author: string;
}

const platformowner = "0x39b6A6fAe1e40839B8E278E10976bC3275c887Fd";

const Tweet: FunctionComponent<Props> = ({ ipfsHash }) => {
  const [tweet, setTweet] = useState<Tweet>();
  async function getTweetFromIpfs() {
    const res = await axios.get(
      "https://gateway.pinata.cloud/ipfs/" + ipfsHash
    );
    if (!res) return;
    setTweet(res.data);
  }
  useEffect(() => {
    getTweetFromIpfs();
  }, []);

  if (!tweet) return null;
  return (
    <Box
      px="20px"
      py="40px"
      border="solid"
      borderColor="gray.800"
      borderWidth="1px 0 1px 0"
    >
      <HStack alignItems="start">
        <Avatar name={avatarIconFromAddress(tweet.author)} />
        <Box w="full" px="10px">
          <Link
            color="white"
            fontSize="1rem"
            fontWeight={600}
            href={`https://testnet.bscscan.com/address/${tweet.author}`}
          >
            {shortenAddress(tweet.author)}{" "}
            {tweet.author === platformowner ? (
              <AiFillCheckCircle
                color="#1DA1F2"
                style={{ display: "inline" }}
              />
            ) : null}
          </Link>
          <Text fontSize="0.8rem" opacity={0.8}>
            {new Date(tweet.timestamp).toLocaleDateString()}{" "}
            {new Date(tweet.timestamp).toLocaleTimeString()}
          </Text>
          <Text
            my="20px"
            fontSize="1.2rem"
            fontWeight={500}
            whiteSpace="pre-wrap"
          >
            {tweet.content}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};
export default Tweet;
