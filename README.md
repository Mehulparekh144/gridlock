# 🧩 GridLock: Your AI-Powered Trivia Game Generator! 🤖

<p align="left">
  <img src="./public/logo.png" alt="GridLock Logo" width="150"/>
</p>


[![Made by Mehul](https://img.shields.io/badge/Made%20by-Mehul%20Parekh-blue?style=flat-square&logo=github)](https://github.com/Mehulparekh144)

Tired of boring trivia nights? Want to challenge your friends (or yourself!) with custom Jeopardy-style games on *any* topic imaginable?

**Welcome to GridLock!** ✨

GridLock uses the magic of AI to instantly generate a full 5x5 Jeopardy grid based on **your idea**. Just give it a topic, and *poof* – you've got a unique trivia game ready to play!

## 🤔 How Does This Sorcery Work?

It's ridiculously simple:

1.  **💡 Input Your Idea:** Got a topic? "Famous Cats Throughout History"? "Obscure 90s Cartoons"? "Types of Cheese"? Go wild!
2.  **🪄 AI Magic Happens:** Our AI assistant gets to work, crafting 5 distinct categories with 5 questions each, ranging from easy-peasy (100 points) to mind-bending (500 points).
3.  **🎮 View Your Game:** Instantly see the generated trivia board. *(Sharing features coming soon!)*

## ✨ Features

*   **AI-Powered Generation:** Creates unique trivia games on demand.
*   **Classic Jeopardy Format:** Familiar 5x5 grid with increasing point values.
*   **Endless Topics:** If you can think of it, GridLock can (probably) make a game about it!
*   **Simple & Fast:** Go from idea to playable game in seconds.
*   **Sharable Links:** Easily challenge others *(Upcoming Feature!)*

## 🚀 Tech Stack

*   **Frontend:** Next.js (React)
*   **Styling:** Tailwind CSS & shadcn/ui (Shoutout to [neobrutalism.dev](https://www.neobrutalism.dev))
*   **AI:** Integration with a Large Language Model (details in `src/app/(main)/actions.ts`)
*   **Database:** Prisma 

## 🏁 Getting Started

Want to run GridLock locally?

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Mehulparekh144/Gridlock.git # Or your repo URL
    cd Gridlock
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Set up environment variables:**
    *   Create a `.env` file in the root directory.
    *   Copy the contents of `.env.example` (if it exists) or add the necessary variables (like API keys for the AI model). Refer to `src/app/(main)/actions.ts` to see what might be needed.
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Found a bug? Have a cool feature idea? Feel free to open an issue or submit a pull request!

---

Built with ❤️ by [Mehul Parekh](https://github.com/Mehulparekh144).
