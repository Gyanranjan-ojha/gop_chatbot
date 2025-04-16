# GameOpedia Chatbot

A Flask-based chatbot application that provides gaming information using OpenAI's API. The chatbot serves as a gaming data assistant for an online website, providing users with information about various games.

## Features

- Interactive web-based chat interface
- Real-time responses using OpenAI's API
- Game information retrieval including:
  - Game titles
  - Developers
  - Release dates
  - Business models
  - Genres and subgenres
  - Themes
  - Screenshots

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Requirements

- Python 3.8+
- Flask 3.0.1
- OpenAI 1.8.0
- python-dotenv 1.0.0
- PyMySQL (for database connection)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gop_chatbot.git
   cd gop_chatbot
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv .venv
   # On Windows
   .venv\Scripts\activate
   # On macOS/Linux
   source .venv/bin/activate
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
MYSQL_HOST=your_mysql_host
MYSQL_USER=your_mysql_user
MYSQL_PASS=your_mysql_password
MYSQL_PORT=your_mysql_port
MYSQL_DB=your_database_name
```

## Usage

1. Start the Flask server:
   ```
   python main.py
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:8080
   ```

3. Use the chatbot interface to ask questions about games.

## Project Structure

```
gop_chatbot/
│
├── main.py                # Main Flask application
├── function.py            # Assistant creation functions
├── process.py             # Database processing functions
├── knowledge.json         # Game data for the assistant
│
├── static/                # Static files directory
│   ├── CSS/               # CSS stylesheets
│   ├── JS/                # JavaScript files
│   └── icons/             # Image files
│
├── templates/             # HTML templates
│   ├── index.html         # Main chat interface
│
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation
```

## API Endpoints

- `GET /`: Renders the main chat interface
- `GET /getGPTAssistant`: Starts a new conversation thread
- `POST /getGPTPromt`: Processes user messages and returns responses

## License

[MIT License](LICENSE)

---

Developed for GameOpedia - your source for comprehensive gaming information.