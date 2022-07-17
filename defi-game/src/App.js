import "./App.css";
import { VStack, Text, HStack } from "@chakra-ui/react";
import { useEffect,useState } from "react";
import GameScreen from "./Components/GameScreen";

function App() {


  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <div style={{ backgroundImage: "url(/background.jpg)" }}>
        <VStack justifyContent="center" alignItems="center" h="100vh">
          <HStack marginBottom="10px">
            <Text
              margin="0"
              lineHeight="1.15"
              fontSize={["1.5em", "2em", "3em", "4em"]}
              fontWeight="600"
            >
              DeFi Hero
            </Text>
          </HStack>
          <GameScreen/>
        </VStack>
      </div>
    </div>
  );
}

export default App;
