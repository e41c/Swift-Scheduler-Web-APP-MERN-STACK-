# SwiftSchedule: A Class Management System

SwiftSchedule is an Express-based web application designed to streamline the management of dance classes. It allows for efficient handling of class schedules, student enrollments, and class ratings, enhancing the experience for both instructors and students. With features like class filtering and attendance tracking on the horizon, SwiftSchedule aims to be a comprehensive solution for dance schools and their administrative needs.

## Features

- **Class Creation and Management:** Instructors can create new classes, update class information, and delete classes as needed.
- **Student Enrollment:** Students can join classes that match their interest and skill level, with checks in place to prevent over-enrollment.
- **Rating System:** Students can rate classes they've attended, contributing to a class's overall rating and assisting future students in making informed decisions.
- **Class Filtering:** Users can filter classes based on the student level (Beginner, Intermediate, Advanced) or dance category (Ballet, Ballroom, Contemporary, Hip Hop, Jazz), making it easier to find classes that suit their needs.
- **(Planned) Attendance Tracking:** A feature to track and display attendance for each class, providing valuable data for instructors and students alike.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT for secure authentication and authorization
- **Others:** Mongoose for MongoDB object modeling, dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/e41c/Capstone-II---Group26.git


Install NPM packages:
npm install

Create a .env file in the root directory and configure your environment variables:
PORT=3000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri

Start Server:
npm start


Usage
To interact with the SwiftSchedule system, you can use Postman or any API testing tool to send requests to the available endpoints. Examples include:

Creating a class: POST /classes
Joining a class: POST /classes/join/:id
Rating a class: POST /classes/rate/:id
Filtering classes: GET /classes/filter/byAttributes
Refer to the project's API documentation (if available) for detailed information on all endpoints and their usage.
