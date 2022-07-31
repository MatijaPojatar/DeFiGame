import React, { useState, useEffect } from "react";
import { Box, Input, VStack, HStack, Button, color } from "@chakra-ui/react";
import FirebaseService from "../../Services/FirebaseService";
import "./ChatBox.css";
import Moment from "react-moment";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

export default function ChatBox({ messages, nickname }) {
  const [message, setMessage] = useState("");
  const [showLogs, setShowLogs] = useState(true);

  const sendMessage = () => {
    if (message && message.length < 80) {
      FirebaseService.sendMessage(message, nickname, false);
      setMessage("");
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="chat">
      <Box className="chatbox">
        {messages.map((m, i) => (
          <div key={i} className="div-right">
            {!m.log ? (
              <>
                (<Moment format="hh:mm:ss">{m.timestamp}</Moment>){m.nickname} :{" "}
                {m.text}
              </>
            ) : (
              <>
                {" "}
                {showLogs && (
                  <div className="div-log">
                    {m.nickname} {m.text}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </Box>
      <HStack className="text-input-area">
        <Input
          className="text-input"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Input>
        <Button className="eightbit-send-btn" onClick={sendMessage}>
          Send
        </Button>
        <Checkbox
          isChecked={showLogs}
          onChange={() => {
            setShowLogs(!showLogs);
          }}
        >Logs</Checkbox>
      </HStack>
    </div>
  );
}
