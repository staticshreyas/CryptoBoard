# CryptoBoard

### Overview

**CryptoBoard** is a web application that provides users with real-time cryptocurrency analytics and insights. It aggregates data from various sources (news APIs, social media posts, and market data from Finnhub), processes the collected information, and displays it in an interactive dashboard. The architecture follows a microservices pattern, ensuring scalability, maintainability, and independent development of individual services.

### Key Features

- **User Authentication:** Secure login and registration using JWT-based authentication.
- **Data Collection Services:** Scheduled tasks to fetch cryptocurrency prices, news, and posts from external APIs (e.g., Finnhub).
- **Data Processing Service:** Aggregates and processes the stored data, computing metrics like growth rates, and provides RESTful APIs for the frontend.
- **Frontend Dashboard:** A React-based UI that displays charts, graphs, and filtered views of cryptocurrency data. Users can interact with filters, visualize historical trends, and compare different cryptocurrencies.
- **API Gateway:** Acts as the single entry point for all client requests, handling authentication, rate limiting, and proxying requests to the appropriate backend services.
- **MongoDB Database:** Stores user data, articles, posts, and price information.

### Project Structure

```
CryptoBoard/
├── api-gateway/
│   ├── Dockerfile
│   ├── index.js
│   ├── routes/
│   └── package.json
├── data-collection-services/
│   ├── Dockerfile
│   ├── scheduler.js
│   ├── utils/
│   ├── crypto-price-fetcher.js
│   ├── crypto-news-fetcher.js
│   └── package.json
├── data-processing-service/
│   ├── Dockerfile
│   ├── index.js
│   ├── routes/
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── public/
│   ├── src/
│   └── package.json
├── shared-models/
│   ├── User.js
│   ├── Article.js
│   ├── Post.js
│   └── CryptoPrice.js
├── config/
│   └── default.json
├── docker-compose.yml
└── README.md
```

- **api-gateway:** Handles incoming requests, authentication, and routes to backend services.
- **data-collection-services:** Periodically fetches and stores crypto news, prices, and posts.
- **data-processing-service:** Provides RESTful endpoints for metrics, articles, posts, and combined data requests.
- **frontend:** React-based UI for dashboard visualization.
- **shared-models:** Mongoose models for users, articles, posts, and crypto prices.
- **config:** Configuration files (e.g., database URIs, API keys).

### Prerequisites

- **Docker & Docker Compose:** Ensure you have Docker and Docker Compose installed on your system.
- **API Keys & Secrets:** Set your environment variables (e.g., `FINNHUB_API_KEY`, `JWT_SECRET`) in the `config/default.json` or using `.env` files.

### Running the Application with Docker

1. **Build the Images:**
   Navigate to the project’s root directory:
   ```bash
   cd CryptoBoard
   docker-compose build
   ```

   This command reads the `docker-compose.yml` file and builds Docker images for the `api-gateway`, `data-processing-service`, `data-collection-services`, and `frontend`.

2. **Start the Services:**
   ```bash
   docker-compose up
   ```

   This starts all the containers and services defined in `docker-compose.yml`. The `api-gateway` and `data-processing-service` will connect to `mongo` (MongoDB) and await requests. The `data-collection-services` will begin scheduled data fetching. The `frontend` will be served at the port defined in the `docker-compose.yml` (e.g., `http://localhost:3001`).

3. **Access the Dashboard:**
   Once all services are running, open your browser and navigate to:
   ``` 
   http://localhost:3001
   ```
   or the port you configured in your `docker-compose.yml` for the `frontend` service.

4. **Interacting with the Application:**
   - **Register/Login:** Create an account or log in to access the dashboard.
   - **View Charts and Filters:** Explore interactive charts, filter data by date/source, and review historical trends and comparisons.
   
5. **Stopping the Services:**
   Press `Ctrl + C` in the terminal running `docker-compose up` or run:
   ```bash
   docker-compose down
   ```
   to stop and remove the containers.

### Additional Notes

- **Environment Variables:** Ensure your `config/default.json` or `.env` file includes the correct API keys and credentials.
- **Scaling Services:** You can scale the data-collection or processing services by adjusting `docker-compose.yml`.
- **Logging & Troubleshooting:** Use `docker-compose logs -f` to monitor container logs and identify issues.

---
