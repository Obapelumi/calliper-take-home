# Calliper example take-home task

This is an example of a task which has some bugs in it.

## Running locally

#### Prerequisites

Install node 16 either through [website](https://nodejs.org/download/release/latest-v16.x/) or [nvm](https://github.com/nvm-sh/nvm)

### Back-end

#### Install

1. Open terminal in the `backend` directory
2. Install dependencies `yarn`

#### Running

`yarn start`

#### Running tests

`yarn test`

### Front-end

#### Install

1. Open terminal in the `frontend` directory
2. Install dependencies `yarn`

#### Running

`yarn start` - open https://localhost:3000 to view the app

## Domain Model

Bar chart is used for the test task. Countries are on the X axis, Features are on the Y axis.

**Chart Domain**

- `ChartDataPoint` represents single point on the plot
- `ChartDataFeature` is an enum with all available features
- `Country` is an enum with all available features

**Comment Domain**

- `CommentThread` represents a single thread attached to chart
- `Comment` represents an entry within a thread

## Project structure

`backend` folder hosts Express backend.

- `integration.test.ts` has integration tests
- `services/comments/commentsService.spec.ts` has unit tests for the comments service
- `services/sharing/sharingService.spec.ts` has unit tests for the sharin service

`frontend` folder hosts React/Typescript frontend.

- Jotai atoms are used to manage state.
- Nvio is used for a beautiful, however sometimes laggy, UI
