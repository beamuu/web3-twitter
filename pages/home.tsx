import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Progress,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { ethers } from "ethers";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { hooks } from "../connectors/metamask";
import AuthWrapper from "../wrapper/Auth";
import { abi } from "../public/Twitter.json";
import { ethersProvider } from "../providers/ethers";
import Tweet from "../components/Tweet";
import { reverse } from "dns";
import { avatarIconFromAddress } from "../utils/address";

const Homepage: NextPage = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState<string[]>([]);
  const [ready, setReady] = useState(false)
  const { useAccount, useProvider } = hooks;
  const account = useAccount();
  const provider = useProvider();
  const TwitterContract = new ethers.Contract(
    "0xEb5Ce0F3341F189AB423f7534d5a243689837D5d",
    abi,
    provider?.getSigner()
  );

  async function tweet() {
    setLoading(true);
    if (!account) return;
    const ipfsResponse = await pinJsonToPinata().catch(() => {
      // error
      setLoading(false);
      throw new Error();
    });

    if (!ipfsResponse) throw new Error();
    const tweetHash = await TwitterContract.addTweet(
      ipfsResponse.data.IpfsHash
    );
    console.log(tweetHash);
    setLoading(false);
  }

  async function pinJsonToPinata() {
    const apiKey = process.env.NEXT_PUBLIC_PINATA_KEY;
    const apiSecretKey = process.env.NEXT_PUBLIC_PINATA_SECRET;

    if (!apiKey || !apiSecretKey) return;

    const pinataUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios.post(
      pinataUrl,
      {
        timestamp: Date.now(),
        content: content,
        author: account,
      },
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: apiKey,
          pinata_secret_api_key: apiSecretKey,
        },
      }
    );
  }
  async function getAllTweets() {
    var tweetsArray: string[] = await TwitterContract.connect(
      ethersProvider
    ).getAllLightweightTweets();
    const reversed: string[] = [];
    for (var i = tweetsArray.length - 1; i >= 0; i--) {
      reversed.push(tweetsArray[i]);
    }
    setTweets(reversed);
    setReady(true)
  }
  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <AuthWrapper>
      {!ready ? (
        <Progress size="xs" isIndeterminate colorScheme="twitter" bg="black"/>
      ) : (
        <Container maxW="container.sm" py="40px">
          <HStack spacing={2} alignItems="start">
            <Avatar name={avatarIconFromAddress(account)}></Avatar>
            <Box w="full">
              <Textarea
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
                variant="unstyled"
                placeholder="What's happening"
                fontSize="1.3rem"
                resize="none"
                color="white"
                fontWeight={500}
                h="auto"
                minH="200px"
                whiteSpace="pre-wrap"
                _focus={{
                  boxShadow: "none",
                }}
              />
              <Divider opacity={0.3} />
              <HStack justifyContent="end" my="10px">
                <Button
                  colorScheme="twitter"
                  rounded="full"
                  fontWeight={600}
                  onClick={tweet}
                  isLoading={loading}
                >
                  Tweet
                </Button>
              </HStack>
            </Box>
          </HStack>
          <Heading my="30px" size="sm" opacity={0.8}>All platform tweets</Heading>
          {tweets.map((ipfsHash, index) => (
            <Tweet ipfsHash={ipfsHash} key={index} />
          ))}
        </Container>
      )}
    </AuthWrapper>
  );
};
export default Homepage;
