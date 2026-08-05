Neighbourly

Building stronger communities through trusted sharing.

Neighbourly is a hyperlocal community platform that enables people living in the same neighbourhood to borrow and lend items, request or offer services, and help each other through a trusted digital platform.

Basic Planned Features

- User registration and authentication
- Create and manage requests
- Lend and borrow household items
- Offer and request local services
- Location-based neighbourhood support
- RESTful backend APIs
- PostgreSQL database integration

Tech Stack

Backend

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

Frontend

- React
- Vite
- Tailwind CSS

Deployment

- Backend: (To be deployed)
- Frontend: Vercel
- Database: Neon PostgreSQL


Database Models

User

- id
- name
- email
- phoneNumber
- latitude
- longitude

Item

- id
- title
- description
- owner

Request

- id
- title
- description
- requestType (Item/Service)
- isServed
- requester

API Endpoints

Authentication

- "POST /auth/register"
- "POST /auth/login"

Users

- "POST /user"
- "GET /user/{id}"

Items

- "POST /items"
- "GET /items"
- "GET /items/{id}"
- "DELETE /items/{id}"

Requests

- "POST /request"
- "GET /request/{id}"
- "DELETE /request/{id}"

Future Improvements

- JWT Authentication
- Image uploads
- Ratings and trust score
- Search and filters
- Nearby requests using geolocation
- In-app messaging
- Notifications
- Admin dashboard
- API documentation with Swagger
- Docker support

Getting Started

1. Clone the repository.
2. Configure PostgreSQL (Neon or local PostgreSQL).
3. Update "application.properties" with database credentials.
4. Run the Spring Boot application.
5. Start the frontend.

Team

Binary Builders

Developed as a hackathon project. 