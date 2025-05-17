import OpenAI from 'openai';
import { Request, Response } from 'express';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultQuery: {
    model: 'qwen/qwen3-4b:free' as string,
  },
});

export const getTimeEntryCompletion = async (req: Request, res: Response) => {
  try {
    const reasons = [
      "I was in a meeting anddidn't have time to log my hours.",
      "I was on a deadline and didn't want to take a break.",
      "I was working on a difficult task and didn't want to be distracted.",
      "I was waiting for feedback from someone and didn't want to log my hours until I got it.",
      "I was working on a side project and didn't want to log my hours.",
      "I was on vacation and didn't have access to the internet.",
      "I was sick and didn't want to log my hours.",
      "I was on a business trip and didn't have time to log my hours.",
      "I was in a training session and didn't want to log my hours.",
      "I was working on a project and didn't want to log my hours because I was worried about not meeting the deadline."
    ];
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    const basePrompt = `Professionalise this reason and give me a 2 line repsonse. Write it in a humanised non generic way. I forgot to log my time entry because ${randomReason}.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: basePrompt }],
      model: "qwen/qwen3-4b:free" as string,
    });

    res.status(200).json({ 
      message: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error in getTimeEntryCompletion:', error);
    res.status(500).json({ error: 'Failed to generate completion' });
  }
};

export { openai };


