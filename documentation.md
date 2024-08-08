# Project Set Up
* Library used: Vite
  * Purpose: Easy set-up process of a React application.
```terminal
$ npm create vite
mey bers_database
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

# Bug 8 Permission to Push Denied
* Cause: Windows has already stored git credentials that it uses regardless of the account you're signed into in VSCode
* Solution: Control panel > user accounts > credential manager > Windows credentials > Remove Generic credentials for git:https://github.com

# Bug 9 Commit is associated with a wrong account
* Cause: `user.name` and `user.email` aren't configured correctly in VSCode
* Solution: `git config --global user.name "Username"`
`git config --global user.email "Email"`
* Notes: The `--global` flag seems to be necessary, while the double quotes aren't necessary. Use `git config -l` to check all configurations

# Bug 10 antd
[I haven't really looked into this yet](https://github.com/ant-design/ant-design/issues/48709)

# Bug 11 TailWindCSS stopped working after incorporating shadcn-ui
* Cause: During the `init` process, you have likely added a custom Tailwind prefix
* Solution: Manually add the prefix to all existing classes per the rules of Tailwind prefixes found [here](https://tailwindcss.com/docs/configuration#prefix)
* Notes: I'm sure there's a better way, but since I haven't used that much TailwindCSS yet, I just added the prefixes manually. Remember to ctrl + F "className".

# Bug 11.1 Wrong Tailwind class name in shadcn-ui implementation
* Cause: One of the classes is `tw--mx-1`
* Solution: The correct way to prefix the negative value is `-tw-mx-1`
* Notes: I guess this is the benefit of directly installing code to the local repository: if there are bugs, I can just fix it myself?

# Bug 12 Tanstack React Table showing no results
* Cause: There seems to be undefined behavior when the data provided does not include all of the column definitions.
* Cause 2: There is also undefined behavior when the column id has a `.`
* Solution: Ensure all of the column ids (generally the `accessorKey` attributes in the column definitions) are included in the keys of your dataset to prevent unexpected behaviors. Also, generally ensure the keys match JavaScript naming conventions. Change special characters like `.` in keys if necessary.

# Bug 7 `git add` not working
While `git status` works anywhere in the project, make sure to be in a folder that contains the changed file to run `git add`

# Bug 8 Permission to Push Denied
* Cause: Windows has already stored git credentials that it uses regardless of the account you're signed into in VSCode
* Solution: Control panel > user accounts > credential manager > Windows credentials > Remove Generic credentials for git:https://github.com

# Bug 9 Commit is associated with a wrong account
* Cause: `user.name` and `user.email` aren't configured correctly in VSCode
* Solution: `git config --global user.name "Username"`
`git config --global user.email "Email"`
* Notes: The `--global` flag seems to be necessary, while the double quotes aren't necessary. Use `git config -l` to check all configurations

<<<<<<< HEAD
# Bug 10 antd
[I haven't really looked into this yet](https://github.com/ant-design/ant-design/issues/48709)

# Bug 11 TailWindCSS stopped working after incorporating shadcn-ui
* Cause: During the `init` process, you have likely added a custom Tailwind prefix
* Solution: Manually add the prefix to all existing classes per the rules of Tailwind prefixes found [here](https://tailwindcss.com/docs/configuration#prefix)
* Notes: I'm sure there's a better way, but since I haven't used that much TailwindCSS yet, I just added the prefixes manually. Remember to ctrl + F "className".

# Bug 11.1 Wrong Tailwind class name in shadcn-ui implementation
* Cause: One of the classes is `tw--mx-1`
* Solution: The correct way to prefix the negative value is `-tw-mx-1`
* Notes: I guess this is the benefit of directly installing code to the local repository: if there are bugs, I can just fix it myself?

# Bug 12 Tanstack React Table showing no results
* Cause: There seems to be undefined behavior when the data provided does not include all of the column definitions.
* Cause 2: There is also undefined behavior when the column id has a `.`
* Solution: Ensure all of the column ids (generally the `accessorKey` attributes in the column definitions) are included in the keys of your dataset to prevent unexpected behaviors. Also, generally ensure the keys match JavaScript naming conventions. Change special characters like `.` in keys if necessary.

=======
>>>>>>> 3dc98471aedccc2a178b91ae9862bc14355c3b8c
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
* UI library referenced
  - Flowbite (built with Tailwindcss classes)
  - Shadcn/ui (built with Radix UI & Tailwindcss classes)

## Feature 5.1 Scrollable categorical input

I added a maximum height property (`tw-max-h-[8rem]`) and changed `tw-overflow-hidden` to `tw-overflow-auto` for the `DropdownMenuPrimitive.Content` component in `dropdown-menu.jsx`.

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

## Bug 5.5 Check that a complete date adapter is provided
ChartJS doesn't implement date recognitions by default: an external date formatting library and a corresponding adapter to include said library into ChartJS implementations are required. See a list [here](https://github.com/chartjs/awesome?tab=readme-ov-file#adapters). I chose the `data-fns` library and its corresponding adapter library `chartjs-adapter-date-fns`

## Bug 5.6 "time" is not a registered scale
Since I'm implementing tree-shaking (fancy term for only importing select functionalities as I need them), remember to import `TimeScale` and/or `TimeSeriesScale`. Also, `register` them after.

## Bug 5.7 Use "yyyy" instead of "YYYY"
The `data-fns` library switched to [Unicode tokens](https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md) since v2, so their parsing function requires slightly different formats compared to other date libraries. Lower case `y` formats standard calendar years, while upper case `Y` formats a special type of year called ISO year that has whole-number weeks? It's a bit different to say at the least.

## Bug 5.8 Graph behaves weirdly after setting `parsing` to `false` in the options for a `ChartJS` graph
You need to conform to format your input to the internal structure of both the graphs & the axes.

### Bug 5.8.1 Line graph with time series x-axis
First of all, data should be given in the `{x: val, y: val}` format. Secondly, nsure that the time is given in [Unix timestamps](https://en.wikipedia.org/wiki/Unix_time).

### Bug 5.8.2 Time series data processed with `getUnixTime()` from the `date-fns` library becomes incorrect
`getUnixTime()` returns the timestamp in seconds, but JavaScript keeps timestamps in milliseconds. As such, multiply the result by 1000 to get the correct timestamp for `ChartJS`.

### Bug 5.8.3 Bar graph with categorical x-axis
In addition to giving data in the `{x: val, y: val}` format, the category scale requires you to also input the `data.labels` field outside of all the datasets.

## Bug 5.9 Stacked bar chart overlaps instead of stacking
Make sure to set `stacked` to `true` for both the x and y axes. Assuming the x-axis is the index axis: the `stacked` property on the x-axis allows bars to overlap horizontally, while the `stacked` property on the y-axis enables the actual stacking.

## Bug 5.10 Graph with time series as x-axis not showing up

If the range of time spans many decades, but your time series data is granular to the seconds, then there's no reasonable way for ChartJS to meaningfully separate the different time frames (which, again, are measure in seconds but spread throughout the decades). Then, I believe that ChartJS simply does not plot anything.

In the extreme case that your time series data is as described above, you may have to make the choice to sacrifice the precision of your data and remove some of the more granular time series information (ex. only keeping what date it was instead of being precise to the second).

## Bug 5.11 The previous state of column filters are always the initial state
* Cause: I was calling another function `setNewFilter` inside the function `processRangeInput` wrapped in `useCallback`, but I forgot to include `setNewFilter` in the dependency list of `processRangeInput`, causing `processRangeInput` to always call the initial version of `setNewFilter` that still has the initial state instead of the most up-to-date state.
* Solution: Remember to include in the dependency list any variable that can change.

## Bug 5.12 `table.getHeaderGroups()` throws error
* Cause: For some reason, the column definitions argument passed to `useReactTable()` must be named `columns` and nothing else (not `colDefs`, for example)
* Solution: I'm not sure why; I'll look into the implementation later. After some research, this is actually the expected behavior of JavaScript objects: if you pass a variable into a JS object without a key, then the variable name will automatically be the key. As a result, since `useReactTable` takes a JS object as its sole argument, passing in the variable `columns` is actually equivalent to passing in a `columns: columns_value` entry. Since the key `columns` is an expected key name that's going to be used later, the variable has to be named `columns` when passed as an argument to `useReactTable`. Otherwise, explictly state the key-value pair with `columns: whatever_variable_name_for_column_definitions`.

## Bug 5.13 Data table with filters doesn't work
* What does work: when filters aren't enabled (no Filter components), the initial state works, inputting with time-series input works; everything works as intended
* What doesn't work: when filters are enabled, `getFacetedMinMaxValues()` behaves weirdly (wraps min value of day in an array?)
* Possible cause: `getFilterValue()` in `Filter` can return `undefined` and passes `undefined` to `curRange` prop of `RangeInput`
* Another bug: It appears that the implementation of `getFacetedMinMaxValues()` has a bug. The internal implementation uses a function called `getUniqueValues(columnId)` that returns an array, but that array is used as the default value of min and max. Since JavaScript allows comparing a number to a single-number array, the function probably expected the default min and max to not be the actual min and max. However, since the State Climate dataset is sorted, the initial value of 1 is actually the min, so the function returns `[array(1), number]` instead of `[number, number]`
* Another bug: I forgot how to add the columns back...
* I did `slice()` on the column array; remove that and then I'm fine
* I forgot to rename `spec.hum` to `spec_hum` when moving the dataset to a static file which causes the undefined behavior

### Bug 5.13.1 Infinite rerenders of `DataTable`
* Cause: Including the `changeAfterDelay()` event handler in the dependency array of the `useEffect` hook in `DebouncedInput`

## Bug 5.14 `subarray()`
* `subarray()` doesn't exist for a regular array; use `slice()` (NOT `splice()`)

## Bug 5.15 x values are all 0 on ChartJS
* Specify `type: 'linear'` for x-axis