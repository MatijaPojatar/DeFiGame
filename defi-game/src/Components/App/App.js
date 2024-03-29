import "./App.css";
import { useEffect,useState } from "react";
import GameScreen from "../GameScreen/GameScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainMenu from "../MainMenu/MainMenu";
import CharSelect from "../CharSelect/CharSelect";
import Test from "../Test/Test";

function App() {


  useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route exact path="/game" element={<GameScreen/>}>
          </Route>
          <Route exact path="/" element={<MainMenu />}>
          </Route>
          <Route exact path="/select" element={<CharSelect />}>
          </Route>
          <Route exact path="/test" element={<Test />}>
          </Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
