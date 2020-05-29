# chat-react-socket

## What is it?

This is a humble exercise consisting in a **chat app**

## How does it work?

Built in a node.js server with socket.io implementing a frontend in React 16.

# How can I run it?
## Online
[![Runme](https://runme.io/static/button.svg)](https://runme.io/run?app_id=15537940-41b4-44f6-81ff-2cb96ee7fda4) (Takes about 4 minutes to load)

## Locally
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

- [x] Chat - message box
- [x] Chat box - sent messages floating right
- [x] Chat box - received messages floating left
- [x] Messages - contains date
- [x] Messages received - contains user name
- [x] Chat input - box in the bottom of page with a text input and a send button
- [x] Chat tab - blinks when user is in other tab and receives messages
- [x] Settings - user name
- [x] Settings - theme light or dark
- [x] Settings - clock format 24 or 12h
- [x] Settings - send messages on CTRL+ENTER
- [x] Settings - reset to defaults button
- [x] Settings - stored in local storage

## Optional features

- [x] Chat box - smiles support
- [ ] Chat box - link parser => youtube
- [ ] Chat box - link parser => images
- [ ] Chat box - link parser => generic links
- [x] Chat tab - unread messages count
- [x] Settings - language selection

## Steps taken to create this app

- Init git project
- Create dummy app following [this article](https://medium.com/@tim.givois.mendez/create-a-react-project-from-scratch-without-create-react-app-f02fce4e05b)
- Add i18n following the criteria of Robin Wieruch in [this article](https://www.robinwieruch.de/react-internationalization)
- Add local storage save inspired by Robin Wieruch in [this article](https://www.robinwieruch.de/local-storage-react)