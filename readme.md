# Overview
This is the repository for Team 022's progress on the AstraZeneca Neurodiversity Hackathon 2021.

We chose Challenge #4 - Robert Radcliffe.

## Our Solution
<img src="examples/logo.png" width="200" />

Our product is intended to increase accessibility for long texts/articles by summarising and highlighting key information from user-inputted texts.

We use DeepAI's [text summary](https://deepai.org/machine-learning-model/summarization) and [text tagging](https://deepai.org/machine-learning-model/text-tagging) APIs.

<br>

<img src="examples/condensed text.png" width=300>

**Condensed text** is presented as a list of the input's key sentences.

<br>

<img src="examples/highlighted text.png" width=300>

**Highlighted text** is presented with the key sentences highlighted.

<br>

<img src="examples/keyword expansion.png" width=300>

**Keywords** can be accessed from a drop down list on the left hand side.

<br>

<img src="examples/acronyms.png" width=300>

**Acronyms** and their definitions can be accessed to the right hand side via a drop down list, allowing for key information to be recalled easily.

<br>

<img src="examples/colour wheel.png" width=300>

In order to enhance readability for dyslexic users, the colour of the background of text fields can be changed via a colour wheel.

<br>

<img src="examples/colourful background.png" width=300>

Here, this colour has been set to a light green tone.


## Future enhancement
The following features could be added to improve the product further.
- Text to speech functionality
- Saving previously condensed texts on the site
- Providing relevant google image search results for the identified keywords
- The ability to extract texts from various file types and websites

## Usage
A local testing server can be opened by following these steps.
- On the first time, run `npm install` from both `frontend/` and `backend/` to install all required packages.
- Running `node server.mjs` from `backend/` to start a basic backend server.
- Running `ng server` from `frontend/` to start a basic Angular server.
- Navigating to `http://localhost:4200` to see the product in action.

<br>

# Credits
<!-- ![image](examples/credits.png) -->
<img src="examples/credits.png" width="200" />