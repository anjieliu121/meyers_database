# Project Set Up
* Library used: Vite
  * Purpose: Easy set-up process of a React application.
```terminal
$ npm create vite
meyers_database
React
Javascript
$ cd meyers_database
$ npm install
$ npm run dev
```


# Feature 1 Sidebar Menu

## Bug 1.1 refresh
when refreshed in Share Data page, the home page tab will be highlighted
solution

# Feature 2 Home Page
# Feature 3 Share Data Page
* Package used: EmailJS
```terminal
$ npm install --save @emailjs/browser
```
## Feature 3.1 File Attachment
## Feature 3.2 Pop-up after Submission

When the form is submitted, a pop-up window shows to confirm that the form is submitted.
* Function used: alert()
* Finished date: 5/23/2024 Thursday 
* Feature proposed date: 5/21/2024 Tuesday by Shraddha

# Feature 4 Google Cloud Storage Integration
## Feature 4.1 fetch()

When the user clicks on a data tab, the React app sends a CORS API request to the running Flask server, and the Flask server sends a request to Google Cloud Storage to retrieve the data. The React app then uses hooks to update the webpage with the data retrieved by the Flask server.
## Bug 4.1 fetch()
fetch() with proxy in package.json returns text/html
* Cause: Installing vite causes system to ignore proxy in package.json
* Solution: simply specify the full url regardless of the proxy value in package.json (or figure out how to configure proxy in vite.config.js)