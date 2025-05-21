# Young Everest Football Web Scraper and Data Display

This project consists of a backend that scrapes football data from external sources, and a frontend that displays the data. The scraper is designed to handle dynamically loaded websites using Puppeteer.

## Project Structure

```
project/
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models (if using a database)
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions and scraper logic
│   ├── .env               # Environment variables
│   └── package.json       # Backend dependencies
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── utils/         # Utility functions
    │   ├── App.tsx        # Main React component
    │   └── main.tsx       # Entry point
    └── package.json       # Frontend dependencies
```

## Features

- **Web Scraping**: Scrape football data (standings, fixtures, team stats) from external websites
- **Dynamic Content Handling**: Uses Puppeteer to handle JavaScript-rendered content
- **Caching**: Caches scraped data to reduce load on source websites
- **Configurable Selectors**: CSS selectors can be configured to work with different websites
- **Admin Interface**: Configure scraping targets and selectors through a UI
- **Responsive Frontend**: Modern UI for displaying football data

## Backend Technologies

- Node.js & Express
- Puppeteer for headless browser scraping
- Cheerio for HTML parsing
- Axios for HTTP requests
- In-memory caching system

## Frontend Technologies

- React with TypeScript
- TailwindCSS for styling
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js v14+ and npm

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   CACHE_DURATION=21600000
   SCRAPE_WAIT_TIME=3000
   SCRAPE_TIMEOUT=30000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

### Scraping Configuration

1. Navigate to the Scrape Config page in the application
2. Enter URLs for the football data sources
3. Configure the CSS selectors to match the structure of the target website
4. Test the configuration to ensure data is scraped correctly
5. Save your configuration

### Viewing Football Data

1. The main Football Data view displays standings, fixtures, and team stats
2. Data is automatically loaded from the configured sources
3. Use the refresh button to force a fresh data fetch

## Responsible Scraping

- Always check the terms of service of websites you're scraping
- Implement proper caching to reduce load on target websites
- Add appropriate delays between requests
- Consider contacting website owners for permission or API access if available

## License

This project is licensed under the MIT License.
