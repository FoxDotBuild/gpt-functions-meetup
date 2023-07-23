import { gptPrompt } from "../gpt-prompt";

const spamExamples = [
  "Amazing! This blog looks exactly like my old one! Check out my website at www.xyz.com!",
  "Hey there, I love your post! I've just started a new business, and you can get a 50% discount at www.xyz.com!",
  "Great blog, found a lot of useful info. By the way, do you know you can make $5000 a week working from home? Visit www.xyz.com now!",
  "Really informative article. Hey, has anyone tried the weight loss program from www.xyz.com? It works wonders!",
  "Your writing style is unique. Want to learn the secret of becoming a millionaire overnight? Just click www.xyz.com!",
];

(async () => {
  for (const spam of spamExamples) {
    await spamDetector(spam);
  }
})();

async function spamDetector(message: string) {
  const PROMPT =
    "Does the following message look like spam? Reply 'YES' or 'NO': ";
  // Actual responses:
  // * "NO"
  // * "YES"
  // * "Yes"
  // * "Spam messages generally exhibit certain characteristics
  // such as unsolicited promotions or links. Based on the
  // given message, it can be classified as spam because it
  // contains an unsolicited link to a website. Therefore,
  // the answer is 'YES'".

  const response = (
    await gptPrompt({
      role: "user",
      content: PROMPT + message,
    })
  ).choices[0]?.message?.content;

  return response === "YES";
}
