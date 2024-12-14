import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" ,dangerouslyAllowBrowser: true});

export async function main(message) {
    const chatCompletion = await getGroqChatCompletion(message);
    console.log(chatCompletion);
    return (chatCompletion?.choices[0]?.message?.content || "");
  }
  
async function getGroqChatCompletion(message) {
    // message = message ?? "How are you"
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    //   prompt: message,
      model: "llama3-8b-8192",
      "temperature": 0.7,
      "max_tokens": 1024,
      "top_p": 1,
    //   "stream": true,
    //   "stop": null
    });
  }

//   export GROQ_API_KEY=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