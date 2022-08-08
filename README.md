# Golem Hello World App

This application demonstrates a simple hello world use-case, showing how to execute tasks on Golem network

## Demo

![demo](https://user-images.githubusercontent.com/5244214/183405755-48628e93-beb6-4c95-92b5-b89c2d0b0701.gif)

## Setup

Prerequisites:

- Node v14.17 or higher
- Yarn v1.22 or higher
- Yagna daemon running ([docs](https://handbook.golem.network/requestor-tutorials/flash-tutorial-of-requestor-development))

Install packages

```
$ yarn
```

## Run

To execute the whole example, run the following command (replacing `<your_name>` with your actual name)

```
$ yarn run start <your_name>
```

The **main.js** file configures Golem network and deploys the task to the workers (stored in the **task.js**)

