# Income & Expenditure API

## Quick Start

To spin up the entire application locally using Docker, simply run:

```
make build
```

This command will:

1. Build the Docker images for the Node application and PostgreSQL.
2. Seeds the database.
3. Start the containers in the background.

Once the containers are running, the application will be available at:

```
http://localhost:3000
```

## API Documentation

Swagger docs are automatically served at:

```
http://localhost:3000/api-docs
```

## Makefile Commands

- **make build**:

  - Builds and starts the Node and PostgreSQL containers in detached mode.
  - Seeds the database (`npm run seed`).

- **make ssh-app**:

  - Opens an interactive shell (bash) inside the running Node container.

- **make start**:

  - Starts the containers in detached mode (without rebuilding).

- **make stop**:

  - Stops the containers but does not remove them.

- **make test**:

  - Runs the test suite (`npm test`) inside the Node container.

- **make delete**:
  - Removes the containers and their associated volumes.

## Tech Stack

- **Node.js & Express**
- **TypeScript**
- **Prisma**
- **PostgreSQL**
- **Mocha/Chai**
- **Docker & Docker Compose**

## Postman Collection

A Postman collection is included in this repo (`postman_collection.json`). Import it into Postman to quickly test the endpoints. Bear in mind you will need to create a statement first! Ran out of time to seed the statement data....

## TODO / Future Improvements

With more time, here are some enhancements I would consider:

1. **Remove the Hardcoded API Key, users and passwords**: Currently, the API key, mysql user and pass etc are stored in the code for an easy run and review. In reality I would store these securely in a secrets manager and pass them to the env vars.
2. **User-Based Authentication**: Either implement user-based (customer) authentication directly in this API or create a separate backend for frontend (BFF) service that handles login/authorization, masking the API key from the client side.
3. **Automated E2E Tests with Newman**: Use Newman to run the Postman collection (with added tests) as part of a CI pipeline for continuous, automated end-to-end testing.
4. **Schema Validation with Zod**: I could generate TypeScript interfaces from Zod schemas or vice versa to perform runtime validation, providing clearer, more standardized API errors.
5. **Expanded Error Handling & Logging**: Integrate a logging library (e.g., Winston) and add more precise error responses.
6. **Scalability & Hosting**: If this was utilised beyond local usage, I would implement solutions like AWS ECS or Kubernetes etc for production-grade scaling and use a managed DB service. Additionally I wouldn't be hard coding the ports...

---

Thanks for checking out the Income & Expenditure API! I hope it’s straightforward to set up and run. If you have any questions or issues, feel free to reach out.
