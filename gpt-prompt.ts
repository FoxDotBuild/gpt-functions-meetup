import { ChatCompletionRequestMessage } from 'openai';
import { openai } from './openai';

export async function gptPrompt(input: ChatCompletionRequestMessage) {
    const resp = await openai.createChatCompletion({
        temperature: 1.0,
        model: "gpt-3.5-turbo-0613",
        messages: [input],
    });

    return resp.data;
}