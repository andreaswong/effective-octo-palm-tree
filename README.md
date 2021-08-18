# Dot Game

The goal of this exercise is to create a game. In the game, dots move from the top to the bottom of the screen. A player tries to click on the dots, and receives points when they are successful.

https://cranky-meitner-e39631.netlify.app/

## Running project

- Install dependencies: `yarn install`
- Run project in local: `npm start`
- Build project: `npm run build`

## Changes

For the sake of convenience in sizing, and smooth animation, the following changes were done in units (`1em` =` 16px`)

- MIN_BALL_WIDTH = `3em` worth 1 point
- MAX_BALL_WIDTH = `12em` worth 10 points
- Lowest slider setting moves a ball 10px every 100ms
- Highest slider setting moves a ball 100px every 100ms

- Max number of balls on screen at a time is set to `40`

## Mockup

![mockup](https://cdn.gomix.com/84ca8f35-cd1c-4d74-ad6f-f1f108b5b85a%2Fdot-game-with-banner.png)

## Building the Game

- The game starts when a player touches or clicks the Start button; at that point, the Start button changes to a Pause button, which should pause the game until the button is touched or clicked again.
- Dots fall at a constant rate. A player should be able to use a slider to control the rate at which dots fall; at the slider's left-most position, dots should fall at a speed of 10px per second, and at the slider's right-most position, should fall at a speed of 100px per second.
- A new dot appears at a random horizontal position at the top of the box every second. A dot should not "hang" off the left or right edge of the screen.
- Dots should vary randomly in size from 10px in diameter to 100px in diameter.
- A dot's value is inversely proportional to its size, with the smallest dots worth 10 points, and the largest dots worth 1 point.
- When a player touches or clicks a dot, the dot should disappear from the box, and the score should be increased based on the dot's value.
- A new dot should also appear every 1000ms.

## Links

- https://glitch.com/edit/#!/subdued-aged-hat
