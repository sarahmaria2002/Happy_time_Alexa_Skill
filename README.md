# Happy Time Alexa Skill

**Happy Time** is an Alexa skill built with Node.js and developed using the Alexa Skill Development Console. 
This skill provides users with various entertainment options, such as news, facts, jokes, and music recommendations. 
Users can interact with the skill through voice commands to get random facts, the latest news, jokes, and music recommendations across different genres.

## Features

- **News:** Get the latest news headlines from different countries (randomly selected between India and the US).
- **Facts:** Receive a random fun fact.
- **Jokes:** Hear a random joke to lighten your mood.
- **Music:** Choose from various music genres like EDM, Hip-Hop, K-Pop, Rock, Pop, Country, and Latin, and get music recommendations.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

Navigate to the project directory:
cd happy-time-alexa-skill

Install dependencies:
npm install

Update the X-RapidAPI-Key in the code with your RapidAPI key for the APIs used: (make your account in RapidAPI and get the keys if needed)
- Random Facts API: random-facts4.p.rapidapi.com.
- Google News API: google-news1.p.rapidapi.com.
- Geek Jokes API: geek-jokes.p.rapidapi.com.

Deploy the skill using the Alexa Developer Console or the Alexa Skills Kit Command-Line Interface (ASK CLI).

## Usage
Once deployed, you can interact with the skill by saying:

- "Alexa, open Happy Time."
The skill will greet you and prompt you to choose between different options like news, facts, jokes, music, or movies.

- "Alexa, give me a fact."
The skill will fetch and tell you a random fact.

- "Alexa, tell me a joke."
The skill will provide a random joke from the Geek Jokes API.

- "Alexa, what's the news?"
The skill will give you the latest headline from a random country.

- "Alexa, play some music."
The skill will ask for your preferred genre and recommend music accordingly.

## Supported Intents
- LaunchRequest: Welcomes the user and provides options to choose from.
- FactsIntent: Fetches a random fact using the Random Facts API.
- NewsIntent: Retrieves the latest news from a random country using the Google News API.
- JokesIntent: Fetches a joke using the Geek Jokes API.
- MusicIntent: Asks the user to choose a music genre for recommendations.
- RecommendMusicIntent: Provides music recommendations based on the chosen genre.

## API Information
This skill integrates with the following APIs:
- Random Facts API: Provides random facts for the FactsIntent.
- Google News API: Fetches the latest news headlines for the NewsIntent.
- Geek Jokes API: Delivers jokes for the JokesIntent.
