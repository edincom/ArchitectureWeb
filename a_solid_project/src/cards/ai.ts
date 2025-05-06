import OpenAI from "openai";

export async function generateQuestions(userContent: string) {
  const apiKey = process.env.OPENAI_KEY;
  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.deepseek.com",
  });
  const systemPrompt = `
    You are a helpful assistant. The user will provide a text passage (e.g., an article or multiple paragraphs).
    Your task is to read the content and generate a list of multiple question-answer pairs based on it.

    Each question should test comprehension or factual recall from the passage. Each answer should be concise and accurate.

    Return the output strictly as a JSON array of objects with the format:
    [
    {
        "question": "Your question here?",
        "answer": "The correct answer here."
    },
    ...
    ]
    `;
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string; name?: string }> = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userContent },
  ];
  const response = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: messages,
    response_format: { type: "json_object" }
  });
  const parsed = JSON.parse(response.choices[0].message.content ?? "");
  console.log(JSON.stringify(parsed, null, 2));
  return parsed
}
