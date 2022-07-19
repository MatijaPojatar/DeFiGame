import "./App.css";
import { useEffect,useState } from "react";
import GameScreen from "./Components/GameScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainMenu from "./Components/MainMenu";
import Test from "./Components/Test";

function App() {


  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route exact path="/game" element={<GameScreen />}>
          </Route>
          <Route exact path="/" element={<MainMenu />}>
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
