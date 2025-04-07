# 📁 FrameCraft Web

FrameCraft Web is the frontend React application for the FrameCraft platform.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed on your system:

- Node.js (v20 or newer recommended)
  - > The project is tested on Node `v23.9.0`
- pnpm (recommended), npm or yarn

### Install dependencies

```bash
pnpm install
```

### Environment Variables

Make sure the React app knows where to find the backend API. Configure the appropriate `.env` file and set the `VITE_API_BASE_URL` variable:

```
VITE_API_BASE_URL=http://localhost:3001
```

### Start the development server

```bash
pnpm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build the app

```bash
pnpm run build
```

---

## 🐳 Running with Docker

If you'd like to serve the production build using Docker:

### 1. Build the React app

```bash
ppnpm build
```

### 2. Build and run the container

```bash
podman build -t @framecraft/web .
podman run --rm -it -p 3000:80 @framecraft/web
```

The app will be available at [http://localhost:3000](http://localhost:3000).

