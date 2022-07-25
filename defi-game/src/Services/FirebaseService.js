import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "defi-hero-7b739.firebaseapp.com",
  databaseURL:
    "https://defi-hero-7b739-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "defi-hero-7b739",
  storageBucket: "defi-hero-7b739.appspot.com",
  messagingSenderId: "429303155701",
  appId: "1:429303155701:web:089c3f29b3cb52f0b62ebc",
};

const app = firebase.initializeApp(firebaseConfig);

const setUpPlayers = (players,config) => {
  const allPlayersRef = firebase.database().ref("players");

  allPlayersRef.on("value", (snapshot) => {
    let playersTemp = snapshot.val() || {};
    Object.keys(playersTemp).forEach((key) => {
      if (key === config.playerId) return;
      players[key] = playersTemp[key];
    });
  });

  allPlayersRef.on("child_added", (snapshot) => {
    const addedPlayer = snapshot.val();
    console.log(config.playerId)
    if (addedPlayer.id !== config.playerId) {
      console.log("NEW PLAYER");
      console.log(addedPlayer);
      players[addedPlayer.id] = addedPlayer;
    }
  });

  allPlayersRef.on("child_removed", (snapshot) => {
    const removedPlayer = snapshot.val();
    console.log("REMOVED PLAYER");
    console.log(removedPlayer)
    delete players[removedPlayer.id]
  });
};

const logMyPlayer = async (config, canvas, image) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      config.playerId = user.uid;
      config.playerRef = firebase.database().ref(`players/${config.playerId}`);

      config.playerRef.set({
        id: config.playerId,
        x: canvas.width / 2 - image.width / 4 / 2,
        y: canvas.height / 2 - image.width / 4 / 2,
        sprite: "down",
        val: 0,
        nickname: "girl",
      });

      config.playerRef.onDisconnect().remove();
    } else {
    }
  });
};

export default { app, setUpPlayers, logMyPlayer };
