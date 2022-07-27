import Util from "../Classes/Util"
import Collisions from "../Constants/Collisions"

const getCollisions = ({x,y}) => {
    let collisionMapTemp = [];
    for (let i = 0; i < Collisions.collisionsFirstLevel.length; i += 70) {
      collisionMapTemp.push(Collisions.collisionsFirstLevel.slice(i, i + 70));
    }
    let boundaries = [];
    collisionMapTemp.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          boundaries.push(
            new Util.Boundary({
              position: {
                x: j * Util.Boundary.width+x,
                y: i * Util.Boundary.height+y,
              },
            })
          );
        }
      });
    });

    return boundaries;
  };

export default {getCollisions}