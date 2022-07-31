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

const setUpPlayers = async (players, config) => {
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
    console.log(config.playerId);
    if (addedPlayer.id !== config.playerId) {
      console.log("NEW PLAYER");
      console.log(addedPlayer);
      players[addedPlayer.id] = addedPlayer;
    }
  });

  allPlayersRef.on("child_removed", (snapshot) => {
    const removedPlayer = snapshot.val();
    console.log("REMOVED PLAYER");
    console.log(removedPlayer);
    delete players[removedPlayer.id];
  });
};

const logMyPlayerV2 = async (charType, callbackLog,callbackDisconnect) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    console.log(user);
    if (user) {
      let isNewPlayer = false;
      let config = {};
      config.playerId = user.uid;
      config.playerRef = firebase.database().ref(`players/${config.playerId}`);

      const image = new Image();
      image.src = "/sprites/" + charType + "/down.png";

      const getPromise = await config.playerRef.get();
      let myPlayer = getPromise.val();
      console.log(myPlayer);

      if (!myPlayer) {
        isNewPlayer = true;
      }

      config.playerRef.onDisconnect().remove(async () => {
        callbackDisconnect()
      });
      config.check = true;
      callbackLog(myPlayer, isNewPlayer, config);
    } else {
    }
  });
};

const setUpChat = async (setMessages) => {
  const chatRef = firebase.database().ref("chat");

  chatRef.on("child_added", (snapshot) => {
    console.log("=== NEW MESSAGE ===")
    console.log(snapshot.val())
    const newMessage = snapshot.val();
    let msgDate = new Date(newMessage.timestamp);
    let now=new Date()
    now.setMinutes(now.getMinutes()-1)
    if (msgDate.getTime() >= now.getTime())
      setMessages((messages) => [...messages, newMessage]);
  });

  chatRef.on("value", (snapshot) => {
    console.log("==== NEW SNAPSHOT ===")
    console.log(snapshot.val())
  });

  console.log("==== FINISHED SETTING UP CHAT ====")
};

const sendMessage = async (message, nickname,isLog) => {
  const chatRef = firebase.database().ref("chat");
  let newId;
  await chatRef.get().then((snapshot) => {
    if (snapshot.val()) {
      newId = snapshot.val().length;
    } else {
      newId = 0;
    }
  });
  const newMessageRef = firebase.database().ref(`chat/${newId}`);
  let date = new Date();
  console.log(date);
  newMessageRef.set({
    id: newId,
    text: message,
    timestamp: date.toString(),
    nickname: nickname,
    log: isLog
  });
};

export default { app, setUpPlayers, logMyPlayerV2, setUpChat, sendMessage };
