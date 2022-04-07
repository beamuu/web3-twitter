import { Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import Navbar from "../components/Navbar";
import { connector, hooks } from "../connectors/metamask";

const AuthWrapper: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const { useAccount, useIsActive } = hooks;
  const account = useAccount();
  const isActive = useIsActive();
  async function init() {
    await connector.activate(97);
  }
  useEffect(() => {
    init();
  }, []);
  if (!account) {
    return (
      <>
        <Navbar />
        <Progress size='xs' isIndeterminate colorScheme="twitter" bg="black"/>
      </>
    );
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthWrapper;
