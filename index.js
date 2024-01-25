import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

const botToken = "6859099173:AAGls2BBXDMIpkTFjJN_72koP-FI6jn3xUA";
const bot = new TelegramBot(botToken, { polling: true });
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage =
    "Welcome to Ryūtector!\n\nIf you want to scan a token, use /quickscan <TOKEN_ADDRESS>.\n\nPlease visit https://locker.ryujintoken.xyz, click on 'Lock', choose which token (or LP token) you want to lock, the duration, and you’re good to go. Once done, click on the 'Generate Link' to share your lock with other users.";
  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/quickscan/, async (msg) => {
  const chatId = msg.chat.id;

  const code = msg.text.split("/quickscan")[1]?.trim();

  try {
    const response = await axios.get(`https://api.ryujintoken.xyz/lp/${code}`);
    const data = response.data[0];

    const message = `<b style="color: red">Contract Address</b> 👓: <code>${code}</code>\n<b>LP Address</b> 📇: <code>${data?.lp}</code>\n<b>Number of Locked Tokens </b> 🔒: 🟢 ${data?.lockedValue} 🟢\n<b>Percentage of LP Tokens </b>📇: 🟢 ${data?.lockedPercentage} 🟢\n<b>Duration of Lock </b> ⏲️: 🟢 ${data?.lockedPercentage} 🟢`;
    const message1 = `<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
// <blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>`;

    bot.sendMessage(chatId, message, { parse_mode: "HTML" });
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Error fetching data. Please make sure your mint address is correct."
    );
  }
});

// bot.onText(/\/quickscan/, async (msg) => {
//   const chatId = msg.chat.id;

//   const code = msg.text.split("/quickscan")[1]?.trim();

//   try {
//     const response = await axios.get(`https://api.ryujintoken.xyz/lp/${code}`);
//     const data = response.data[0];

//     const message = `*Contract Address* 👓: ${code}\n*LP Address* 📇: ${data?.lp}\n*Number of Locked Tokens* 🔒: ${data?.lockedValue}\n*Percentage of LP Tokens* 📇: ${data?.lockedPercentage}\n*Duration of Lock* ⏲️: ${data?.lockedPercentage}`;

//     bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
//   } catch (error) {
//     bot.sendMessage(
//       chatId,
//       "Error fetching data. Please make sure your mint address is correct."
//     );
//   }
// });
