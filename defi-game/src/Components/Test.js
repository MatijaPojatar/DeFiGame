import React, { useEffect } from "react";
import "./Test.css";

export default function Test() {
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
  return (
    <div class="load">
      <div class="load-whole">
        <div class="d">
          <div id="D1" class="d1 a1"></div>
          <div id="D2" class="d2 a1"></div>
          <div id="D3" class="d3 a1"></div>
          <div id="D4" class="d4 a1"></div>
          <div id="D5" class="d5 a1"></div>
          <div id="D6" class="d6 a1"></div>
        </div>
        <div class="e">
          <div id="E1" class="e1 a1"></div>
          <div id="E2" class="e2 a1"></div>
          <div id="E3" class="e3 a1"></div>
          <div id="E4" class="e4 a1"></div>
        </div>
        <div class="e">
          <div id="F1" class="f1 a1"></div>
          <div id="F2" class="f2 a1"></div>
          <div id="F3" class="f3 a1"></div>
        </div>
        <div class="i">
          <div id="I1" class="i1 a1"></div>
          <div id="I2" class="i2 a1"></div>
        </div>
      </div>
    </div>
  );
}
