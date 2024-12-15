import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.REACT_APP_API_KEY ,dangerouslyAllowBrowser: true});

export async function main(message) {
    const chatCompletion = await getGroqChatCompletion(message);
    return (chatCompletion?.choices[0]?.message?.content || "");
  }
  
async function getGroqChatCompletion(message) {
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
    });
  }
