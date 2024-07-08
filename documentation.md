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
# General Bugs

## Bug 1 Python
`python3` command does not exist on Windows because Windows does not have Python installed by default and hence does not distinguish between Python 2 and Python 3

Nonetheless, it seems like `pip3` is a valid command

## Bug 2 React

Uncaught ReferenceError: react is not defined

Much better solution: Include react as a plugin in vite.config.js with `@vitejs/plugin-react`. Then, you only need to `import React from "react"` at the top of `main.jsx`

Previous bad solution: add `import React from "react"` at the top of every React component that returns an HTML chunk (ToggleThemeButton.jsx, Home.jsx, ShareData.jsx, etc.)



## Bug 3 CORS

Check the value `os.environ["GOOGLE_APPLICATION_CREDENTIALS"]` in `app.py`

Most likely, the error occurred you're not using the path to the json file on your own computer. If you're using Windows, make sure to type `C:/` or likewise if the file is located in a drive. `/c/` does not work.

## Bug 4 No module named XXX

If you installed the Python libraries in a virtual environment, make sure to enter that same virtual environment with `source path/to/activate` every time (the exact path name might differ depending on OS: in my Windows it's `venv_name/Scripts/activate`, but on Mac it's `venv_name/bin/activate`)

## Bug 5 OSError

This error occurs when trying to install all requirements. In my case, the error is due to the lack of admin privileges. The solution is to run the command prompt in Windows as administrator and then pip install there.

## Bug 6 Import Error

The issue isn't actually with the modules: for some reason, `flask run` gives this error, while `python -m flask run` runs the code as intended. I have no idea why: the error just started appearing on 06/18/2024. Maybe it's because of a vscode update?

After some further testing, it appears that when running `python app.py` or `python -m flask run`, `sys.executable` is `C:\Python311\python.exe` and `flask.__version__` is `3.0.3`. However, when running `flask run`, the results are `c:\program files (x86)\microsoft visual studio\shared\python37_64\python.exe` and `2.2.2` instead.

Some more information: https://stackoverflow.com/questions/58564162/what-is-the-difference-between-using-flask-run-vs-python-app-py-vs-python-m-fla

After even more searching, I can safely say the bug is due to the the version of the Python executable (not necessarily the version of Flask). I'm not sure about the `google.cloud` library, but `flask_cors` requires Python 3.8 or later. The Python executable that `flask run` uses is Python 3.7 which is not supported by these newer libraries. Essentially, adding `python -m` ensures the correct Python version is used when there are multiple Python versions on the computer.

# Bug 7 `git add` not working
While `git status` works anywhere in the project, make sure to be in a folder that contains the changed file to run `git add`
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

## Bug 3.1 File Upload

Changing the file input doesn't trigger the associated function.

### Solution 3.1

In React, it seems like only the name of a single function can be passed (ex. `onChange={getFile}` works as intended). 

Any attempt to pass a parameter seems to cause undefined behaviors (ex. `onChange={getFile(this)}` or `console.log("Changing a file")` does not work as intended even though logging works in regular HTML).

## Feature 3.3 Approved Email List

When the user clicks the submit button, the form is only submitted if the input email is in the approved list of email addresses.
* Implementation: (1) I stored the emails in a JSON file. This is being imported to the "ShareData.jsx" and extracted the value in a `const`; (2) I stored the user-input email as a variable using `useState()`. The value of the variable is assigned as a `value` parameter in the input field. (3) I set up a `const` function that takes in the email input and returns True/False on whether the email is in the list. The form will only be sent if the email is approved.
* Finished date: 5/24/2024 Friday
* Feature proposed date: 5/24/2024 Friday by Shraddha

# Feature 4 Google Cloud Storage Integration
## Feature 4.1 fetch()

When the user clicks on a data tab, the React app sends a CORS API request to the running Flask server, and the Flask server sends a request to Google Cloud Storage to retrieve the data. The React app then uses hooks to update the webpage with the data retrieved by the Flask server.
## Bug 4.1 fetch()
fetch() with proxy in package.json returns text/html
* Cause: Installing vite causes system to ignore proxy in package.json
* Solution: simply specify the full url regardless of the proxy value in package.json (or figure out how to configure proxy in vite.config.js)

# Feature 5 Data Visualization
* Package used: Tailwindcss (Postcss & Autoprefixer)
* UI library referenced: Flowbite (built with Tailwindcss classes)
## Bug 5.1 ReferenceError: Buffer is not defined
* Cause: The `csv-parse` package uses the core Node.js module `buffer` that is not supported in some browsers.
* Solution: Install the `vite-plugin-node-polyfills` package into `devDependencies` and include the package as a plugin in `vite.config.js`. More detailed instructions can be found on the [installation website](https://www.npmjs.com/package/vite-plugin-node-polyfills).
* Explanation: A polyfill is defined as a piece of JavaScript code that can provide some functionality to browsers that don't support said functionality yet. Since some browsers don't natively support core Node.js modules like `buffer` or `fs`, simply import a polyfill package that fulfills those needed functionalities.

## Bug 5.2 The "chunk" argument must be one of type string or Buffer
* Cause: An object is passed as an argument to `parser.write()` instead of a string.
* Solution: When fetching a blob from GCP, GCP actually returns a dictionary where `data` points to the actual data in string form and `dataset` points to the path to the blob in GCP. Thus, you can't just pass GCP's entire response as an argument. You should pass only the `data`.

## Bug 5.3 Reference to Chart is Not Updated After Rendering
The reference here refers to the reference created by a `useRef` hook.

* Cause: A call to a web API during rendering precedes the update to the reference (on the callback queue?) after rendering is done. As a result, the reference used inside that web API call won't be updated.
* Solution: Since `useEffect` (based on my experience) runs after the references are updated, simply put the web API call in `useEffect` to ensure the reference used inside the web API call is updated. I guess this bug shows how `useEffect` is necessary to synchronize connections to external web APIs.
* Caveat: This approach works fine in production, but when developing using React Strict Mode, `useEffect` for some reason is only called once instead of twice, very likely disrupted by the timing of the web API calls (but I don't know how). I'm not sure how to fix this (this might be an inherent limitation of React Strict Mode), but since it works in production, I'm fine.

## Bug 5.4 TailwindCSS Classes Not Working
This is a basic problem: remember to import the CSS file where you included the TailwindCSS classes. Vite supports including the CSS file conveniently through the `import` syntax similar to how you would import a JS file.
