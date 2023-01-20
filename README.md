# geo_app

A brief description of what this project does and who it's for

## Table of contents

- [Extensions](#extensions)
- [ESLint](#eslint)
- [Setup](#setup)

## Extensions

Extensions required:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## ESLint

We are extending our eslint with:

- [react-native-community](https://www.npmjs.com/package/@react-native-community/cli)
  > To use the recommended rules for expo projects
- [plugin:react/jsx-runtime](https://www.npmjs.com/package/jsx-runtime)
  > Because we are not using jsx

```
"rules": {
    * ... *
    "react/react-in-jsx-scope": "off"
}
```

### VSCode settings

```
"editor.formatOnSave": true,
"editor.tabSize": 4,
// Disable eslint format on save for js files
"[javascript]": {
    "editor.formatOnSave": false
},
// Set vscode to use prettier rules before eslint ones
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
"prettier.endOfLine": "auto"
```

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```
