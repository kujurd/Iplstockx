// Using Web Speech API
const startVoiceRecognition = () => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    if(command.includes('buy')) {
      // Execute buy command
    }
  };
  recognition.start();
};