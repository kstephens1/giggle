/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = "K Test <audio src='https://kns-alexa.s3-eu-west-1.amazonaws.com/one-small-step-for-man-48.mp3'/>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('K Test124', speechText)
      .getResponse();
  },
  // <audio src='https://my-apis.000webhostapp.com/audio/Romantic%20Solitude-Instrumental%20(Flute).mp3'/>

};

const GiggleIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GiggleIntent';
  },
  handle(handlerInput) {
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const name = slots['name'].value;

    const speechText = 'Hello Keith, GiggleIntent here';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello Keith, GiggleIntent here', speechText)
      .getResponse();
  },
};


const PlayNoteIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PlayNoteIntent';
  },
  handle(handlerInput) {
    
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const name = slots['name'].value;
    var speechText, audiofile;

    console.log('Got slot value ' + slots['name'].value);

switch(slots['name'].value.toLowerCase()){
  case 'harry':
    speechText = "Playing: " + name +  "<audio src='https://kns-alexa.s3-eu-west-1.amazonaws.com/one-small-step-for-man-48.mp3'/>";
    break;

  case 'chloe':
//    speechText = 'Playing: ' + name;
    speechText = "Playing: " + name + "<audio src='https://kns-alexa.s3-eu-west-1.amazonaws.com/one-small-step-for-man-48.mp3'/>";
    break;
  
    default:
      speechText = 'Name not recognised';
}

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Giggle Skill", speechText)
      .getResponse();
  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GiggleIntentHandler,
    PlayNoteIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
