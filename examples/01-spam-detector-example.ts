import { openai } from "../openai";

const functions = [
  {
    name: "denyComment",
    description: "Flag a comment as spam",
    parameters: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The comment to flag as spam",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "allowComment",
    description: "Flag a comment as spam",
    parameters: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The comment to allow onto the site",
        },
      },
      required: ["id"],
    },
  },
];

const spamExamples = {
  "comment-0090":
    "Get 60% of my real estate investing course when you register now at www.xyz.com!",
  "comment-0204":
    "Hi, Bill. If your hen seems lethargic for that long, you may want to consult a veterinarian as it could be indicative of a serious health condition.",
};

function isSpam(id: string) {
  console.log(`😈 ${id} is spam! Deleting...`);
}

function isNotSpam(id: string) {
  console.log(`😇 ${id} is OK! Saving...`);
}

async function betterSpamDetector(id: string, message: string) {
  const data = `(ID: ${id}) ${message}`;
  const resp = await openai.createChatCompletion({
    temperature: 1.0,
    model: "gpt-3.5-turbo-0613",
    functions: functions,
    function_call: "auto",
    messages: [
      {
        role: "system",
        content:
          "If the user makes a comment that seems like spam call `denyComment`, otherwise call `allowComment`.",
      },
      {
        role: "user",
        content: data,
      },
    ],
  });

  resp.data.choices.map(({ message }) => {
    if (message?.function_call) {
      const { function_call } = message;
      // I dislike this API....
      const args: { id: string } = JSON.parse(function_call?.arguments || "");
      if (function_call.name === "denyComment") {
        return isSpam(args.id);
      }
      if (function_call.name === "allowComment") {
        return isNotSpam(args.id);
      }
    }
  });
}

(async () => {
  for (const [id, comment] of Object.entries(spamExamples)) {
    await betterSpamDetector(id, comment);
  }
})();
