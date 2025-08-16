import { initializeApp } from 'firebase/app';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const firebaseConfig = {
  apiKey: 'AIzaSyCl_fV9Ympx106DQSk6ytPNfLqqRm7WPCs',
  authDomain: 'document-image-processin-f06f9.firebaseapp.com',
  projectId: 'document-image-processin-f06f9',
  storageBucket: 'document-image-processin-f06f9.firebasestorage.app',
  messagingSenderId: '799045424197',
  appId: '1:799045424197:web:0ca9aa38c291b1d7c2ff2c',
};

const app = initializeApp(firebaseConfig);

const ai = getAI(app, { backend: new GoogleAIBackend() });
export const geminiModel = getGenerativeModel(ai, {
  model: 'gemini-2.5-flash',
});
