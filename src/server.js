import { create } from "venom-bot";
import { stages, getStage } from "./stages.js";

create({
  session: "store",
  multidevice: true,
  headless: false,
})
  .then((client) => start(client))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body == "!ficha" && message.isGroupMsg) {
      const currentStage = getStage({ from: message.from });

      const messageResponse = stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
        client,
      });

      if (messageResponse) {
        var randomNum = Math.floor(Math.random() * 10);
        randomNum = randomNum.toString();
        client
          .sendText(message.from, randomNum)
          .then(() => {
            console.log("Message sent.");
            console.log(message.from);
          })
          .catch((error) => console.error("Error when sending message", error));
      }
    }
  });
}
