# swag-backoffice

## Technology stack

- [React](https://reactjs.org/)
- [react-admin](https://marmelab.com/react-admin/)
- [material-ui](https://material-ui.com/)
- [NodeJS](https://nodejs.org/en/)

## Develop

- Install [NodeJS](https://nodejs.org/en/)
- Run `npm install`
- Run `npm start` to run the project
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Development practices

- We are using [eslint](https://eslint.org/) to provide consistency across the codebase
- We are using `NODE_PATH` to avoid imports like this: `'../../../../lib/myModule'`
- You should never abstract things behind `index.js` - i.e: name all your classes / modules and specify your imports.
- We tend to use ES6 syntax as much as possible
- Take some time to look at [eslintrc.json](./eslintrc.json) rules and documentation for more informations

## Build

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

We use Bitbucket pipelines for the deployment process

### Development

When branch ``develop`` is updated, the application is automatically deployed to heroku.

If deployment fail, you should get an email from Bitbucket

### Preprod & Prod

When branch ``staging``(preprod) or ``master``(prod) is updated, Bitbucket build and push a new Docker image to Appstud registry.

Then, you'll have to deploy manually from Bitbucket :

Go to Pipelines -> Click on your build -> Click `run` on `deploy to ssh` step.

It will connect with ssh to the preprod server, pull the new Docker image and restart the container.


## i18n
update `src/i18n/fr.js` with this :
https://github.com/marmelab/react-admin/blob/master/packages/ra-language-french/src/index.ts
