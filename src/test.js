import { initializeApp } from 'firebase/app';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';
import { readFileSync } from 'fs';
import { basename } from 'path';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' });

async function fileToGenerativePart(filePath) {
  const fileData = readFileSync(filePath);
  const mimeType = getMimeType(filePath);

  return {
    inlineData: {
      data: fileData.toString('base64'),
      mimeType,
    },
  };
}

function getMimeType(filePath) {
  const extension = basename(filePath).split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}

async function run() {
  const prompt = 'What do you see?';

  try {
    const imagePart = await fileToGenerativePart('./assets/hawaii1.jpg');
    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();

//node test.js
