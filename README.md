# min-reveal

Minimal setup for creating a [reveal.js](https://revealjs.com) presentations in a productive way, i.e.

- split slides each in a separate HTML file
- automatic asset handling
- building a standalone package for distribution
- full offline capabilities

## Usage

### Install

To install the dependencies:

```
npm i
```

### Local

To run the loop and view the presentation locally:

```
npm start
```

The presentation will be available under [http://localhost:3210](http://localhost:3210) and responds to changes.

### Package

To build a standalone package for distribution:

```
npm run build
```

## Explanation

Each slide can be a separate HTML file inside `src/` which will be picked up by a gulp task and concatenated.

Every asset under `src/asset` is copied to the build directory.
