const MenuAnalyzer = require('./google');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const fs = require('fs');
const keyFile = '../sustainabite-402702-824ad0d58774.json';
const imagePath = '../assets/menu.png';

// Initialize the client with service account key
const client = new ImageAnnotatorClient({ keyFile });

// Initialize the MenuAnalyzer
const analyzer = new MenuAnalyzer();

// Perform text recognition on the image
async function recognizeText() {
  try {
    const [result] = await client.textDetection(imagePath);
    const textAnnotations = result.textAnnotations;

    if (textAnnotations.length > 0) {
      const recognizedText = textAnnotations[0].description;

      // Log the recognized text
      console.log('Recognized text:', recognizedText);

      // Analyze the recognized text with MenuAnalyzer
      analyzer.analyzeMenuText(recognizedText)
        .then((analysisResult) => {
          console.log(analysisResult)
        })
        .catch((analysisError) => {
          console.error('Error analyzing menu text:', analysisError);
        });
    } else {
      console.log('No text found in the image.');
    }
  } catch (error) {
    console.error('Error during text recognition:', error);
  }
}

// Call the text recognition function
recognizeText();

