import React, { useEffect } from "react";
import "./MainMenu.css";
import { Button, Box, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MainMenu() {
    const navigate=useNavigate()
  useEffect(() => {
    window.setTimeout(function () {
      document.getElementById("D1").classList.add("expandd1");
    }, 2000);
    window.setTimeout(function () {
      document.getElementById("D2").classList.add("expandd2");
    }, 2500);
    window.setTimeout(function () {
      document.getElementById("D3").classList.add("expandd3");
    }, 2500);
    window.setTimeout(function () {
      document.getElementById("D4").classList.add("expandd4");
    }, 3000);
    window.setTimeout(function () {
      document.getElementById("D5").classList.add("expandd4");
    }, 3000);
    window.setTimeout(function () {
      document.getElementById("D6").classList.add("expandd6");
    }, 3500);
    window.setTimeout(function () {
      document.getElementById("I1").classList.add("expandi1");
    }, 2000);
    window.setTimeout(function () {
      document.getElementById("F1").classList.add("expandf1");
    }, 2000);
    window.setTimeout(function () {
      document.getElementById("E1").classList.add("expande1");
    }, 2000);
    window.setTimeout(function () {
      document.getElementById("E4").classList.add("expande4");
    }, 2500);
    window.setTimeout(function () {
      document.getElementById("F3").classList.add("expandf3");
    }, 2500);
    window.setTimeout(function () {
      document.getElementById("E3").classList.add("expande3");
    }, 3000);
    window.setTimeout(function () {
      document.getElementById("F2").classList.add("expandf2");
    }, 3000);
    window.setTimeout(function () {
      document.getElementById("E2").classList.add("expande2");
    }, 3500);
  }, []);

  const goToGame=()=>{
    navigate("/game")
  }

  const goToSelect=()=>{
    navigate("/select")
  }

  return (
    <div className="div">
      <VStack
        justifyContent="center"
        alignItems="center"
        h="70vh"
        marginBottom="30px"
      >
        <div className="load">
          <div className="load-whole">
            <div className="d">
              <div id="D1" className="d1 a1"></div>
              <div id="D2" className="d2 a1"></div>
              <div id="D3" className="d3 a1"></div>
              <div id="D4" className="d4 a1"></div>
              <div id="D5" className="d5 a1"></div>
              <div id="D6" className="d6 a1"></div>
            </div>
            <div className="e">
              <div id="E1" className="e1 a1"></div>
              <div id="E2" className="e2 a1"></div>
              <div id="E3" className="e3 a1"></div>
              <div id="E4" className="e4 a1"></div>
            </div>
            <div className="f">
              <div id="F1" className="f1 a1"></div>
              <div id="F2" className="f2 a1"></div>
              <div id="F3" className="f3 a1"></div>
            </div>
            <div className="i">
              <div id="I1" className="i1 a1"></div>
              <div id="I2" className="i2 a1"></div>
              <div id="L3" className="l3 l3-1">
                H
              </div>
              <div id="L4" className="l3 l3-2">
                E
              </div>
              <div id="L5" className="l3 l3-3">
                R
              </div>
              <div id="L6" className="l3 l3-4">
                O
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <Button className="eightbit-btn" onClick={goToGame}>Play Game</Button>
        <br />
        <Button className="eightbit-btn" onClick={goToSelect}>Select</Button>
        <br />
        <Button className="eightbit-btn">Play Game</Button>
      </VStack>
    </div>
  );
}


  
