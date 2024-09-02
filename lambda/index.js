/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
 
const Alexa = require('ask-sdk-core');
const axios = require('axios');

let musicFlag = false;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Happy Time, How can I help you today? With News, Facts, Jokes, Music or Movies.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FactsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'factsIntent';
    },
    async handle(handlerInput) {
        let speakOutput = '';
        let speakOutput1 = "Do you want me to do anything else like News, Jokes, Music or Movies?";
        musicFlag = false;
        const options = {
          method: 'GET',
          url: 'https://random-facts4.p.rapidapi.com/get',
          headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'random-facts4.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	let data = response.data;
        	let fact = data[0].description;
        	speakOutput = `${fact}`+". "+speakOutput1;
        }).catch(function (error) {
        	console.error(error);
        });

        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
    }
};

const NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'newsIntent';
    },
    async handle(handlerInput) {
        let speakOutput = '';
        let speakOutput1 = '';
        musicFlag = false;
        let countryArray = ['IN','US'];                                       
        let CountryIndex = Math.round(Math.random()); 
        let countryCode = countryArray[CountryIndex];
        //console.log(countryCode);
               
        const options = {
          method: 'GET',
          url: 'https://google-news1.p.rapidapi.com/top-headlines',
          params: {country: `${countryCode}`, lang: 'en-US', limit: '50'},
          headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'google-news1.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
            let data = response.data;
            let index = Math.round(Math.random() * 9);
        	let output = data.articles[index].title;
        	//console.log(output);
        	speakOutput1 = "Do you want me to anything else like Facts, Jokes, Music or Movies?";
        	speakOutput = `${output}`+". "+speakOutput1;
        }).catch(function (error) {
        	console.error(error);
        });
        
        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
    }
};

const JokesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'jokesIntent';
    },
    async handle(handlerInput) {
        let speakOutput = '';
        let speakOutput1 = '';
        musicFlag = false;
        const options = {
          method: 'GET',
          url: 'https://geek-jokes.p.rapidapi.com/api',
          params: {format: 'json'},
          headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	console.log(response.data);
        	let data = response.data;
        	let output = data.joke;
        	speakOutput1 = "Do you want me to anything else like News, Facts, Music or Movies?";
        	speakOutput = `${output}`+". "+speakOutput1;
        }).catch(function (error) {
        	console.error(error);
        });
        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
    }
};

const MusicIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'musicIntent';
    },
    async handle(handlerInput) {

        let speakOutput = "Which type of genre you want music in as in edm, hiphop, kpop, rock, pop, country or latin?";
        
        musicFlag = true;

        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
    }
};

const RecommendMusicIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'recommendmusic'
            && musicFlag === true;
    },
    async handle(handlerInput) {
        let speakOutput = '';
        let speakOutput2 = '';
        speakOutput2 = "Do you want me to recommend music in any other genres like edm, hiphop, kpop, rock, pop, country or latin?";
        var output=[];
        
        let hiphop_music=[
            'Jimmy Cooks by Drake and 21 Savage',
            'Backstage Passes by EST Gee and Jack Harlow',
            'Doja by Central Lee',
            'I Like You by Post Malone and Doja Cat',
            'Talk to me Nice by Russ Millions',
            'Super Freaky Girl by Nicki Minaj',
            'Hate on Me by RichSkii',
            'Vegas by Doja Cat',
            'Staying Alive by DJ Khaled and Drake and Lil Baby',
            'Sticky by Drake',
            'Outside by Young Devyn',
            'Soft Life by Bugus and Russ',
            'Die Hard by Kendrick Lamar',
            'True Love by Kanye West',
            'Rage by Arizona Zervas'
        ];

        let kpop_music=[
            'LALISA by LISA',
            'That That by PSY and Suga',
            'Pink Venom by BLACKPINK',
            'Savage by aespa',
            'LOCO by ITZY',
            'TOMBOY by GIDLE',
            'Eleven by IVE',
            'Yet to Come by BTS',
            'Love Dive by IVE',
            'Sky of the Morning by Mr.Gun',
            'Scientist by Twice',
            'Zoom by Jessi',
            'Hot by Seventeen',
            'Stray Kids by Maniac',
            'Butter by BTS'
        ];
        
        let edm_music=[
            'Woke Up In Love by Kygo',
            'Desire by Dimitri Vegas', 
            'Love On Me by THAT KIND',
            'The Drum by Alan Walker',
            'Better by Sonny Fodera',
            'Youre not Alone by CMA',
            'Be Alright by Dustin Miles',
            'Forever by Axero',
            'Wormhole by Diskay',
            'Relief by Ahrix',
            'Flying high by Crisis',
            'Summer Feelings by Alex and Zaka',
            'Voyage by Dripice',
            'Marios Cake by Vexento',
            'Echoes by Aquariion'
        ];

        let rock_music=[
            'Numb by Linkin Park',
            'We will rock you by Queen', 
            'Comfortably Numb by Pink Floyd',
            'Sweet Child O Mine by Guns and Roses',
            'Back in Black by AC/DC',
            'More than a feeling by Boston',
            'Roxanne by The Police',
            'Gimme Shelter by The Rolling Stones',
            'Sunshine of your love by Cream',
            'Rock And Roll All Nite',
            'Whole Lotta Love by Led Zeppelin',
            'Sympathy for the Devil by The Rolling Stones',
            'Under Pressure by Queen & David Bowie',
            'Funk #49 by the James Gang',
            'The Boys Are Back in Town by Thin Lizzy'
        ];

        let pop_music=[
            'Woke Up In Love by Kygo',
            'Desire by Dimitri Vegas', 
            'Love On Me by THAT KIND',
            'The Drum by Alan Walker',
            'Better by Sonny Fodera',
            'Youre not Alone by CMA',
            'Be Alright by Dustin Miles',
            'Forever by Axero',
            'Wormhole by Diskay',
            'Relief by Ahrix',
            'Flying high by Crisis',
            'Summer Feelings by Alex and Zaka',
            'Voyage by Dripice',
            'Marios Cake by Vexento',
            'Echoes by Aquariion'
        ];

        let country_music=[
            'Can the Circle Be Unbroken by The Carter Family',
            'Take This Job and Shove It by Johnny Paycheck', 
            'Cowpoke by Eddy Arnold',
            'The Drum by Alan Walker',
            'Ode To Billie Joe by Bobbie Gentry',
            'Stand By Your Man by Tammy Wynette',
            'Rose Garden by Lynn Anderson',
            'Boulder to Birmingham by Axero',
            'Delta Dawn by Tanya Tucker',
            'It Must Be Love by Don Williams',
            'Why You Been Gone so Long by Jessi Colter',
            'Old Five and Dimers Like Me by Billy Joe Shaver',
            'Walking The Floor Over You by Ernest Tubb',
            'May the Bird of Paradise Fly Up Your Nose by Little Jimmy Dikens',
            'My Heart Skips A Beat by Buck Owens'
        ];

        let latin_music=[
            'Señorita by Shawn Mendes, Camila Cabello',
            'MALAMENTE by Rosalía',
            'Taki Taki by DJ Snake— ft. Selena Gomez, Ozuna, Cardi B',
            'MIA by Bad Bunny feat. Drake',
            'X by Nicky Jam x J. Balvin',
            'Dura by Daddy Yankee',
            'Calma by Pedro Capó',
            'Un Año by Sebastián Yatra, Reik',
            'Despacito by Luis Fonsi ft. Daddy Yankee',
            'BAILA BAILA BAILA by Ozuna',
            'Secreto by Anuel AA, Karol G',
            'Échame La Culpa by Luis Fonsi, Demi Lovato',
            'Con Calma by Daddy Yankee & Snow',
            'Te Bote by Casper, Nio García, Darell, Nicky Jam, Bad Bunny, Ozuna ',
            'Me Niego by Reik ft. Ozuna, Wisin '
        ];

        var input = Alexa.getSlotValue(handlerInput.requestEnvelope, "music");
        var i = '';

        if(input === "edm")
        {
           for(let j=0;j<5;j++)
           {
                i=edm_music[Math.round(Math.random()*14)];
                output.push(i);
           }
        }
        else if(input === "hiphop")
        {
           for(let j=0;j<5;j++)
           {
                i=hiphop_music[Math.round(Math.random()*14)];
                output.push(i);
           }
        }
        else if(input === "kpop")
        {
           for(let j=0;j<5;j++)
           {
                i=kpop_music[Math.round(Math.random()*14)];
                output.push(i);
           }
        }
        else if(input === "rock")
        {
            for(let j=0;j<5;j++)
            {
                 i=rock_music[Math.round(Math.random()*14)];
                 output.push(i);
            }
        }
        else if(input === "pop")
        {
            for(let j=0;j<5;j++)
            {
                 i=pop_music[Math.round(Math.random()*14)];
                 output.push(i);
            }
        }
        else if(input === "country")
        {
            for(let j=0;j<5;j++)
            {
                 i=country_music[Math.round(Math.random()*14)];
                 output.push(i);
            }
        }
        else if(input === "latin")
        {
            for(let j=0;j<5;j++)
            {
                 i=latin_music[Math.round(Math.random()*14)];
                 output.push(i);
            }
        }

        speakOutput = "The top 5 Recommended Songs are : "+output[0]+", "+output[1]+", "+output[2]+", "+output[3]+", "+output[4]+". "+speakOutput2+" or do you want me to do anything else like News, Jokes, Facts or Movies";
        

        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
    }
};

const MovieIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'movieIntent';
    },
    async handle(handlerInput) {
        let speakOutput = '';
        let speakOutput1 = '';
        musicFlag = false;
       const options = {
          method: 'GET',
          url: 'https://netflix-weekly-top-10.p.rapidapi.com/api/movie',
          headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'netflix-weekly-top-10.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
            let data = response.data;
        	console.log(response.data);
            let numbers = [0,1,2,3,4,5,6,7,8,9];
            let titles = [];
            for(let i=0;i<5;i++)
            {
                let index = Math.round(Math.random()*numbers.length);
                titles.push(data[index].name);
                numbers.splice(index-1,index);
            }
            let output = titles[0];
            let output1 = titles[1];
            let output2 = titles[2];
            let output3 = titles[3];
            let output4 = titles[4];
            let final_output ="The top 5 recommended movies for you are "+output+", "+output1+", "+output2+", "+output3+", "+output4;
            speakOutput1 = "Do you want me to anything else like News, Facts, Music or Jokes?";
            speakOutput = `${final_output}`+". "+speakOutput1;
        }).catch(function (error) {
        	console.error(error);
        });

        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye! Thank You for using Happytime. Hope you had a good time!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        //const speakOutput = `You just triggered ${intentName}`;
        const speakOutput = "Sorry I couldn't catch what you said. How can I help you? With News, Facts, Jokes, Music or Movies."
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FactsIntentHandler,
        NewsIntentHandler,
        JokesIntentHandler,
        MusicIntentHandler,
        RecommendMusicIntentHandler,
        MovieIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();