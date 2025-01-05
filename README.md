# FrameCraft Prototype

This repository contains the frontend of the FrameCraft prototype, a web application built using **Vite**, **React**, and **TypeScript**. This setup ensures a fast development experience, modern JavaScript features, and type safety.

## Live Demo

Visit the app at [https://framecraft-prototype.vercel.app](https://framecraft-prototype.vercel.app)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Scripts](#scripts)
- [Development](#development)
- [Building and Previewing](#building-and-previewing)
- [Code Quality](#code-quality)
- [Folder Structure](#folder-structure)

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 or newer recommended)
- `npm`, `yarn` or `pnpm`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/enix403/framecraft-prototype/
   cd framecraft-prototype
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Scripts

The `package.json` includes several scripts to streamline development and deployment:

- `dev`: Starts the development server with hot module reloading.
  ```bash
  npm run dev
  ```

- `build`: Builds the project for production. This script also runs TypeScript type checks before building.
  ```bash
  npm run build
  ```

- `preview`: Previews the production build locally.
  ```bash
  npm run preview
  ```

- `format`: Formats the codebase using Prettier.
  ```bash
  npm run format
  ```

## Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server, which supports hot module reloading and fast builds. Open the application in your browser at the URL provided in the terminal output (currently `http://localhost:3000`).

## Building and Previewing

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Code Quality

### TypeScript Type Checking

Ensure type correctness across the codebase by running:

```bash
npm run typecheck
```

### Formatting

Format all files in the project using Prettier:

```bash
npm run format
```

## Folder Structure

Below is an overview of the folder structure:

```
framecraft-prototype/
├── public/              # Static assets
├── src/                 # Source files
│   ├── components/      # React components
│   ├── pages/           # Pages
│   ├── styles/          # CSS files
│   ├── App.tsx          # React app root
│   └── main.tsx         # Application entry point
```
