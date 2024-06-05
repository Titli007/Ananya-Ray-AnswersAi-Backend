
require("dotenv").config()
const { ChatAnthropic } = require("@langchain/anthropic");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const {HumanMessage, SystemMessage} = require('@langchain/core/messages')

const parser = new StringOutputParser();
const model = new ChatAnthropic({
    model: "claude-3-sonnet-20240229",
    apiKey: process.env.AI_API_KEY,
    temperature: 0
});

async function generateAiAnswer(userMsg) {
    try {
        const messages = [
            new SystemMessage("answer the following question"),
            new HumanMessage(`${userMsg}`),
        ];
        
        const result = await model.invoke(messages);

        try {
            const parsedResult = await parser.invoke(result);
            return parsedResult;
        } catch (parseError) {
            throw parseError; 
        }
        
    } catch (invokeError) {
        throw invokeError; 
    }
}

module.exports = {
    generateAiAnswer
}




