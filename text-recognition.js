import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const { OpenAI } = require("openai");

const { ImageAnnotatorClient } = require('@google-cloud/vision');
const fs = require('fs');
const { google } = require('googleapis');
const keyFile = './sustainabite-402702-f9dbd5b41f01.json';

// Initialize the client with your service account key
const client = new ImageAnnotatorClient({ keyFile });

// Replace 'path/to/your/image.jpg' with the path to the image you want to process
const imagePath = './assets/dinner.jpeg';

// Perform text recognition on the image
async function recognizeText() {
  try {
    const [result] = await client.textDetection(imagePath);
    const textAnnotations = result.textAnnotations;

    if (textAnnotations.length > 0) {
      const recognizedText = textAnnotations[0].description;
      console.log('Recognized text:');
      console.log(recognizedText);
    } else {
      console.log('No text found in the image.');
    }
  } catch (error) {
    console.error('Error during text recognition:', error);
  }
}

// Call the recognizeText function to process the image
recognizeText();

// Function to process and insert menu items and ingredients
async function processTextAndInsertIntoDB(textToParse) {
    const conversation = [
      {
        role: "system",
        content: "You are a helpful assistant that can extract menu items and ingredients from text.",
      },
      {
        role: "user",
        content: "Menu Item: Your menu item description goes here\nIngredients: Your ingredients go here",
      },
    ];
  
    try {
      const response = await openai.createCompletion({
        engine: "text-davinci-003",
        messages: conversation,
      });
  
      const extractedData = extractMenuItemsAndIngredients(response.choices[0].message.content);
      insertDataIntoDB(extractedData);
    } catch (error) {
      console.error("Error with GPT-3:", error);
    }
  }