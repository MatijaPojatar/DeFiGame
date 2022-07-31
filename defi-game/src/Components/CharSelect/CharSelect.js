import React from "react";
import { VStack, HStack, Box, Input, Button } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import "./CharSelect.css";

export default function CharSelect({ charSelected }) {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);

  const [nickname, setNickname] = useState("");
  const [charType, setCharType] = useState("");
  const [errorExists, setErrorExists] = useState(false);

  const startGame = () => {
    console.log("PLAY");
    if (charType === "") {
      alert("Select a char!");
      return;
    }
    if (nickname === "") {
      alert("Enter a nickname!");
      setErrorExists(true)
      return;
    }
    console.log(nickname);
    charSelected(charType, nickname);
  };

  useEffect(() => {
    const canvas1 = canvasRef1.current;
    const ctx1 = canvas1.getContext("2d");

    const image1 = new Image();
    image1.src = "/char_select/Artic.png";
    image1.onload = function () {
      canvas1.height = canvas1.width * (image1.height / image1.width);
      const oc = document.createElement("canvas");
      const octx = oc.getContext("2d");
      oc.width = image1.width * 0.75;
      oc.height = image1.height * 0.75;
      octx.drawImage(image1, 0, 0, oc.width, oc.height);
      ctx1.drawImage(
        oc,
        0,
        0,
        oc.width,
        oc.height,
        0,
        0,
        canvas1.width,
        canvas1.height
      );
    };

    const canvas2 = canvasRef2.current;
    const ctx2 = canvas2.getContext("2d");

    const image2 = new Image();
    image2.src = "/char_select/Princess.png";
    image2.onload = function () {
      canvas2.height = canvas2.width * (image2.height / image2.width);
      const oc = document.createElement("canvas");
      const octx = oc.getContext("2d");
      oc.width = image2.width * 0.75;
      oc.height = image2.height * 0.75;
      octx.drawImage(image2, 0, 0, oc.width, oc.height);
      ctx2.drawImage(
        oc,
        0,
        0,
        oc.width,
        oc.height,
        0,
        0,
        canvas2.width,
        canvas2.height
      );
    };

    const canvas3 = canvasRef3.current;
    const ctx3 = canvas3.getContext("2d");

    const image3 = new Image();
    image3.src = "/char_select/Samurai.png";
    image3.onload = function () {
      canvas3.height = canvas3.width * (image3.height / image3.width);
      const oc = document.createElement("canvas");
      const octx = oc.getContext("2d");
      oc.width = image3.width * 0.75;
      oc.height = image3.height * 0.75;
      octx.drawImage(image3, 0, 0, oc.width, oc.height);
      ctx3.drawImage(
        oc,
        0,
        0,
        oc.width,
        oc.height,
        0,
        0,
        canvas3.width,
        canvas3.height
      );
    };
  }, []);

  return (
    <div>
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <div className="style-title">
          <h1>Select Character</h1>
        </div>
        <HStack>
          <VStack>
            <Box
              borderWidth="3px"
              borderRadius="lg"
              padding="2px"
              borderColor={charType === "Artic" ? "red" : "transparent"}
              onClick={() => {
                setCharType("Artic");
              }}
            >
              <div className="block  style-artic">
                <h1>Artic</h1>
              </div>
              <canvas
                id="canvas1"
                ref={canvasRef1}
                width="200px"
                height="576px"
              ></canvas>
            </Box>
          </VStack>
          <VStack>
            <Box
              borderWidth="3px"
              padding="2px"
              borderColor={charType === "Princess" ? "red" : "transparent"}
              onClick={() => {
                setCharType("Princess");
              }}
            >
              <div className="block  style-princess">
                <h1>Princess</h1>
              </div>
              <canvas
                id="canvas2"
                ref={canvasRef2}
                width="200px"
                height="576px"
              ></canvas>
            </Box>
          </VStack>
          <VStack>
            <Box
              borderWidth="3px"
              borderRadius="lg"
              padding="2px"
              borderColor={charType === "Samurai" ? "red" : "transparent"}
              onClick={() => {
                setCharType("Samurai");
              }}
            >
              <div className="block  style-samurai">
                <h1>Samurai</h1>
              </div>
              <canvas
                id="canvas3"
                ref={canvasRef3}
                width="200px"
                height="576px"
              ></canvas>
            </Box>
          </VStack>
        </HStack>
        <br />
        <HStack>
          <Input
            isInvalid={errorExists}
            errorBorderColor='crimson'
            fontFamily= "Shojumaru"
            _placeholder={{ opacity: 1,color: 'red' }}
            placeholder='Enter a nickname'
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          ></Input>
          <Button
            className="eightbit-select-btn "
            onClick={() => {
              startGame();
            }}
          >
            Play Game
          </Button>
        </HStack>
      </VStack>
    </div>
  );
}
