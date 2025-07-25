# EduForge

EduForge is a full-stack web project designed to help students prepare for competitive exams like GATE, JEE, and NEET. It provides a modular and integrated platform for learning, practice, and performance tracking.

## Project Structure

The project is organized as a monorepo with the following packages:

-   `packages/frontend`: The React-based user interface, built with Vite and styled with Tailwind CSS.
-   `packages/backend`: The Node.js and Express backend, which handles user authentication, data management, and API routing.
-   `packages/ai-services`: A set of Python-based AI services, powered by Flask, for tasks like transcript summarization, quiz generation, and more.

## Getting Started

To get started with the project, you'll need to have Node.js, pnpm, and Python installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/EduForge.git
    cd EduForge
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in `packages/backend` and add your database credentials and JWT secret.
    -   Create a `.env` file in `packages/ai-services` and add any necessary API keys for services like OpenAI.

4.  **Run the applications:**
    -   Start the backend server: `pnpm start:backend`
    -   Start the frontend development server: `pnpm start:frontend`
    -   Start the AI services: `pnpm start:ai-services`

## API Keys

The AI services may require API keys for external services. These should be placed in the `.env` file within the `packages/ai-services` directory. For example:

```
OPENAI_API_KEY=your_openai_api_key
```

Replace `your_openai_api_key` with your actual API key.
