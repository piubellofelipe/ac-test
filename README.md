This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />

## About the project


### Project data structure

I used redux to maintain all the data of the app. I also used redux-persist to keep it and redux-toolkit (with redux-thunk) for my reducers and actions.

There are two reducers on the app (+1 for the persist).

The auth reducer keeps the token and login states.

The calls reducer keeps all data related to calls and the app states that have logic related to it (loadings, filter parameters, etc)
The calls reducer has 2 important keys, ```callGroups``` and ```calls```.
```calls``` is a Map of all the calls that have been fetched, it is a key-value object ( {[Call.id]: Call} )
```callGroups``` holds the callids grouped by date, ( { date: 'some-date-string', calls: [1, 2, 3]  } )

This way the UI can rely on callGroups to know how to render the call listing, and use the ```calls``` object to get the specific call information.

There's one middleware responsible for keeping the authorization token updated. It intercepts any action for the Calls reducer and, it the token is expired, tries to retrieve a new one using /auth/refresh-token
There are surely improvements for this middleware (taking in account if the action is actually fetch-related, for example), but it does its job.

There's also a pusher implementation, responsible for keeping the ```calls``` Map updated

### Project code structure

All the main screens are on /screens folder
There you'll find Login, CallList and CallDetails

I also created a components Folder, under /src, to keep all components that might be reused through the app. It ended up that, from the 3 components in there, only one of them was actually reused


### Testing

I used jest and react's @testing-library for my tests
The tests aren't exhaustive, but I think it shows well how you can test react components.
I mainly used jest to mock my hooks and @testing-library to check how each component used whatever was returned from the hooks (callbacks, render info, etc)

I did not write any tests for my hooks or my redux logic

