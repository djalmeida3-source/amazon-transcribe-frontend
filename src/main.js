import * as TranscribeFrontend from "./transcribeFrontend.js";

const recordButtonFrontend = document.getElementById("recordFrontend");
const transcribedText = document.getElementById("transcribedText");

window.onRecordFrontendPress = () => {
  if (recordButtonFrontend.getAttribute("class") === "recordInactive") {
    startRecording("frontend");
  } else {
    stopRecording();
  }
};

const startRecording = async (type) => {
  window.clearTranscription();
  try {
    if (type === "frontend") {
      recordButtonFrontend.setAttribute("class", "recordActive");
      await TranscribeFrontend.startRecording(onTranscriptionDataReceived);
    }
  } catch (error) {
    alert("An error occurred while recording: " + error.message);
    stopRecording();
  }
};

const onTranscriptionDataReceived = (data) => {
  transcribedText.insertAdjacentHTML("beforeend", data);
};

const stopRecording = function () {
  recordButtonFrontend.setAttribute("class", "recordInactive");
  TranscribeFrontend.stopRecording();
};

window.clearTranscription = () => {
  transcribedText.innerHTML = "";
};
