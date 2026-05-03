import { useEffect } from "react";
import io from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:2020");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => socket.disconnect();
  }, []);

  return <h2>Live Chat</h2>;
}

export default App;