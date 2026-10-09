# 🌿 TerraAI — Touch Grass

### Less Screen. More Green.

TerraAI is an open-source AI-powered outdoor companion that encourages people to step away from their screens and reconnect with nature. It generates personalized outdoor missions based on the user's mood, preferred activity, and available time.

Built with HTML, CSS, JavaScript, Node.js, and an open-weight AI model running locally through Ollama, TerraAI makes getting outside a little more fun.

## ✨ Features

* 🤖 **AI-Powered Missions:** Generate personalized outdoor adventures using a locally running Qwen model.
* 🌱 **Multiple Activities:** Explore nature, walk, watch birds, garden, take nature photographs, or practice outdoor mindfulness.
* ⏱️ **Outdoor Timer:** Track time dedicated to your outdoor mission.
* 🍃 **Leaf Points:** Earn points and track completed missions.
* 📊 **Progress Dashboard:** Monitor accumulated points, completed missions, and recorded outdoor minutes.
* 🔒 **Privacy-Friendly:** AI requests can stay on your local machine, and progress is stored in your browser.
* 💻 **Responsive Interface:** Enjoy a nature-inspired experience on desktop and mobile screens.
* 🌐 **Fallback Missions:** Built-in sample missions keep the core experience usable if the local AI service is unavailable.

## 🛠️ Tech Stack

| Technology  | Purpose                                             |
| ----------- | --------------------------------------------------- |
| HTML5       | Application structure                               |
| CSS3        | Responsive styling and UI design                    |
| JavaScript  | Interactions, mission handling, timer, and progress |
| Node.js     | Backend runtime                                     |
| Express.js  | Local API server                                    |
| Ollama      | Local model inference                               |
| Qwen 2.5 3B | Open-weight language model                          |

## 🧠 How It Works

1. The user selects a mood, outdoor activity, and available time.
2. The JavaScript frontend sends these preferences to the local Express backend.
3. The backend sends a prompt to the Qwen model through Ollama.
4. The AI generates a structured outdoor mission.
5. The user completes the mission away from the screen.
6. The app updates the user's progress and leaf points.

If the AI server is unavailable, the frontend uses predefined sample missions instead.

## 📂 Project Structure

```text
terra-ai/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install the following:

* [Node.js](https://nodejs.org/)
* [Ollama](https://ollama.com/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/terra-ai.git
cd terra-ai
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Install dependencies

```bash
npm install
```

### 3. Download the AI model

```bash
ollama pull qwen2.5:3b
```

The initial model download requires an internet connection.

### 4. Start Ollama

Ensure the Ollama service is running on your computer. On installations where it is not already running, start it with:

```bash
ollama serve
```

If Ollama is already running as a background service, you do not need to start it again.

### 5. Start TerraAI

In the project directory, run:

```bash
npm start
```

### 6. Open the application

Visit:

```text
http://127.0.0.1:3000
```

Choose your mood and activity, generate a mission, and start exploring!

## 🌍 Why Open-Source AI?

Open innovation makes TerraAI more accessible, private, and adaptable.

* **Privacy:** Preferences sent to the local model do not need to leave the user's computer.
* **Local inference:** Mission generation can work without an internet connection after the model has been downloaded, provided the local service is available.
* **Cost control:** Local generation avoids per-request charges from a hosted AI API.
* **Model flexibility:** Developers can experiment with other compatible open-weight models.
* **Transparency and customization:** The mission-generation prompt and application code can be inspected, modified, and improved.

TerraAI demonstrates how open-weight AI can support real-world experiences instead of encouraging more screen time.

## 🎯 Project Goal

The goal of TerraAI is simple: use AI to help people spend more time outside.

Whether it is a short walk, observing birds, tending a garden, or discovering something new in nature, every small outdoor adventure counts.

**Technology should help us experience the world, not replace it.**

## 🔮 Future Improvements

* 📍 Location-aware outdoor mission recommendations
* 🐦 Bird identification using open-source computer vision or audio models
* 🌦️ Weather-aware activity suggestions
* 🗺️ Nature trails and park discovery
* 📱 Progressive Web App (PWA) support
* 🏆 Daily challenges, streaks, and achievements
* 📓 A richer offline nature journal
* 📴 Improved offline support and installable model options

## 🤝 Contributing

Contributions and suggestions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request describing your improvements.

Ideas for new outdoor activities, accessibility improvements, and privacy-preserving AI features are especially welcome.

## 📄 License

This project is intended to be open source. Add a `LICENSE` file specifying your chosen license before publishing it as an openly licensed project.

## 🌿 Built for the Touch Grass Challenge

**TerraAI — Less scrolling. More exploring.**

Made with 💚 and open-source AI.
