// Speech recognition utility for Web Speech API

export const startSpeechRecognition = (callback, errorCallback) => {
  // Check for browser support
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    errorCallback('Speech recognition is not supported in this browser');
    return null;
  }

  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configure
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  // Event handlers
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    callback(transcript);
  };

  recognition.onerror = (event) => {
    errorCallback(`Error occurred in recognition: ${event.error}`);
  };

  recognition.onend = () => {
    // Optional callback for when recognition ends
  };

  // Start listening
  recognition.start();
  
  return recognition;
};

export const stopSpeechRecognition = (recognition) => {
  if (recognition) {
    recognition.stop();
  }
};