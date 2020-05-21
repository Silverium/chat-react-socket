# chat-react-socket

## What is it?

This is a humble exercise consisting in a **chat app**

## How does it work?

Built in a node.js server with socket.io implementing a frontend in React 16.

## How can I run it?

### Requirements

- git
- yarn

### Installation

- clone the repository
  ```bash
  git clone https://github.com/Silverium/chat-react-socket.git
  ```
- install all packages:
  ```bash
  cd chat-react-socket && yarn
  ```
- run in development mode:
  ```bash
  yarn start
  ```

## Features required by this exercise

- [ ] Chat - message box
- [ ] Chat box - sent messages floating right
- [ ] Chat box - received messages floating left
- [ ] Messages - contains date
- [ ] Messages received - contains user name
- [ ] Chat input - box in the bottom of page with a text input and a send button
- [ ] Chat tab - blinks when user is in other tab and receives messages
- [ ] Settings - user name
- [ ] Settings - theme light or dark
- [ ] Settings - clock format 24 or 12h
- [ ] Settings - send messages on CTRL+ENTER
- [ ] Settings - reset to defaults button
- [ ] Settings - stored in local storage

## Optional features

- [ ] Chat box - smiles support
- [ ] Chat box - link parser => youtube
- [ ] Chat box - link parser => images
- [ ] Chat box - link parser => generic links
- [ ] Chat tab - unread messages count
- [ ] Settings - language
- [ ] Settings - language

## Steps taken to create this app

- Init git project
- Create dummy app following [this article](https://medium.com/@tim.givois.mendez/create-a-react-project-from-scratch-without-create-react-app-f02fce4e05b)
- Add i18n following the criteria of Robin Wieruch in [this article](https://www.robinwieruch.de/react-internationalization)
