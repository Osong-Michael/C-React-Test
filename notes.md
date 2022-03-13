## How to run the app

- After cloning the repo locally, run npm install to install all neccesary dependencies.
- Open your terminal in the root folder of the app and run `npm start`. This command will run both the webpack dev server and the api server concurrently, this is possible with the use of the `concurrently` package.
- With both servers running, open a browser and go to `http://localhost:8080/`, here the React application will be running while consuming data from the API running at `http://localhost:3000/`. You can see the products displayed and infinite scroll implemented.

## Features Implemented

- Infinite scroll is built and also data is only queried when the user reaches the bottom of the page. Also there is a loading indicator while the data is being fetched.
- Sorting is possible based on `id`, `price` and `size`, but this is done on the front end as I realised the API didn't sort the data it returned when I passed in the extra params.
- Also implemented the date formatting as requested in the instructions.

## Feature not implemented.

I did not implement the ad feature as I did not want to use a 3rd party library but build the functionality myslef. My idea originally was to use the current bottom boundry div to create a new div with an `id` based on the `current page value` from the reducer in the app, that way, before each new set of products are added I can append the ads div and continue displaying the products below. But having played around with with for a while, I realised the flaw in my plan and despite my different approaches I keep running into issues. I could also just find some 3rd party library and implement the feature but I believe that defeats the purpose and I won't be satisfied personally. Hopefully, I get a chance to prove I have much more to offer. 