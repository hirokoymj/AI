import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Summary from './components/Summary';
import Chat from './components/Chat';

import { useState } from 'react';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);

  console.log(import.meta.env.VITE_FIREBASE_API_KEY); // "123"

  return (
    <>
      <main className="container">
        <Header />
        {uploadedFile ? (
          <>
            <Summary file={uploadedFile} />
            <Chat file={uploadedFile} />
          </>
        ) : (
          <FileUpload setFile={setUploadedFile} />
        )}
      </main>
    </>
  );
}

export default App;
