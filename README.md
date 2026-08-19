# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate everyday workplace tasks with AI. Built with **TanStack Start**, **React 19**, **TypeScript**, and **Tailwind CSS**.

![Tech Stack](https://img.shields.io/badge/TanStack%20Start-FF4154?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat&logo=react&logoColor=black)

## Features

### Smart Email Generator
Draft professional emails in seconds. Choose tone and length, then edit the AI-generated output before sending.

### Meeting Notes Summarizer
Paste raw meeting notes and get a structured summary with key decisions, action items, and owners.

### AI Task Planner
Break goals into prioritised, actionable plans with deadlines and effort estimates.

### AI Research Assistant
Generate structured briefings on any topic with sources, key takeaways, and follow-up questions.

### AI Chatbot Interface
A context-aware assistant for general workplace questions, brainstorming, and follow-ups.

## Demo

Live preview: [https://id-preview--aff46900-be34-4765-b90f-d6f4d633d06f.lovable.app](https://id-preview--aff46900-be34-4765-b90f-d6f4d633d06f.lovable.app)

Published site: [https://your-ai-workflow.lovable.app](https://your-ai-workflow.lovable.app)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended via [nvm](https://github.com/nvm-sh/nvm))
- [Bun](https://bun.sh/) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-workplace-productivity-assistant

# Install dependencies
bun install
# or
npm install

# Start the development server
bun run dev
# or
npm run dev
```

The dev server starts at `http://localhost:8080`.

## Project Structure

```
src/
├── components/
│   └── app/
│       ├── ai-tool.tsx          # Reusable AI tool wrapper
│       ├── app-shell.tsx        # Responsive sidebar + header layout
│       ├── nav-items.ts         # Navigation configuration
│       └── responsible-ai-notice.tsx  # AI disclaimer banner
├── lib/
│   └── ai-client.ts             # Client-side streaming AI helper
├── routes/
│   ├── index.tsx                # Dashboard
│   ├── email.tsx                # Smart Email Generator
│   ├── notes.tsx                # Meeting Notes Summarizer
│   ├── planner.tsx              # AI Task Planner
│   ├── research.tsx             # AI Research Assistant
│   ├── chat.tsx                 # AI Assistant Chat
│   ├── api/ai.ts                # AI gateway proxy endpoint
│   └── __root.tsx               # Root layout + SEO
├── styles.css                   # Global theme + design tokens
└── start.ts                     # TanStack Start server config
```

## AI Integration

The app uses the **Lovable AI Gateway** for streaming responses. The server route at `src/routes/api/ai.ts` proxies requests securely, and `src/lib/ai-client.ts` consumes Server-Sent Events (SSE) on the client for a smooth, typewriter-like experience.

> **Note:** The AI gateway key is read from the server runtime. It is never exposed to the browser.

## Design System

- **Colour palette:** Navy blue background with amber accents.
- **Typography:** Space Grotesk headings + DM Sans body text.
- **UI components:** shadcn/ui with custom Tailwind v4 theme variables.
- **Responsive:** Sidebar navigation collapses into a drawer on mobile devices.

## Responsible AI

This application includes a responsible AI disclaimer that reminds users to review, fact-check, and edit AI-generated content before use. AI outputs are editable by design.

## Deployment

This project is built for edge/serverless deployment with TanStack Start. The easiest way to publish is via the Lovable platform:

1. Open the project in [Lovable](https://lovable.dev).
2. Click **Publish** to deploy to the included Lovable domain.
3. To connect a custom domain, follow the Lovable domain settings.

## Contributing

Contributions are welcome! Please open an issue or pull request with your proposed changes.

## License

[MIT](LICENSE)

---

Built with ❤️ using [Lovable](https://lovable.dev).
