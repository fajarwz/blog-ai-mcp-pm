# Build an AI Project Manager with MCP, Node.js, and Google Sheets
This is an implementation of Build an AI Project Manager with MCP, Node.js, and Google Sheets. A blog about this can be found here: [Build an AI Project Manager with MCP, Node.js, and Google Sheets | Fajarwz](https://fajarwz.com/blog/build-an-ai-project-manager-with-mcp-node-js-and-google-sheets/).

# Installation

## Install Dependencies
```bash
npm install
```

## Configuration
Create a `.env` file in the project root based on `.env.example` and fill in your OpenAI API key and frontend origin URL:

```bash
cp .env.example .env
```

Update `.env` with your own values:

```bash
OPENAI_API_KEY=your_openai_api_key_here
# ...
```

## Run the Server
```bash
npm run dev

# or

npm run prod
```

The backend will run on `http://localhost:3000`.

## Usage

Chat with the AI Agent on `http://localhost:3000/api/tasks/chat`.
