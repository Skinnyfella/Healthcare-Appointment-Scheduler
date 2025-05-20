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
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  let finalTranscript = '';

  // Add timeout for no speech
  const speechTimeout = setTimeout(() => {
    recognition.stop();
    errorCallback('No speech detected. Please try again.');
  }, 5000); // 5 seconds timeout

  // Event handlers
  recognition.onstart = () => {
    finalTranscript = '';
  };

  recognition.onresult = (event) => {
    clearTimeout(speechTimeout); // Clear timeout when speech is detected
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    // If we have a final transcript, send it back
    if (finalTranscript) {
      callback(finalTranscript);
    }
  };

  recognition.onerror = (event) => {
    clearTimeout(speechTimeout);
    switch (event.error) {
      case 'no-speech':
        errorCallback('No speech detected. Please try again.');
        break;
      case 'audio-capture':
        errorCallback('No microphone detected. Please check your microphone settings.');
        break;
      case 'not-allowed':
        errorCallback('Microphone access denied. Please allow microphone access.');
        break;
      default:
        errorCallback(`Error occurred in recognition: ${event.error}`);
    }
  };

  recognition.onend = () => {
    clearTimeout(speechTimeout);
    // If we have a final transcript but haven't sent it yet
    if (finalTranscript) {
      callback(finalTranscript);
    }
  };

  // Start listening
  try {
    recognition.start();
  } catch (error) {
    errorCallback('Error starting speech recognition. Please try again.');
    return null;
  }
  
  return recognition;
};

export const stopSpeechRecognition = (recognition) => {
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }
};