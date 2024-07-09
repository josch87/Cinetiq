# Cinetiq

![Mockup of Cinetiq](/.github/images/cinetiq-mockup_release1.0.0.png)

Cinetiq is an application designed to help film festival staff organize and plan their festivals. With Cinetiq, users can manage content such as films, series, and exhibitions, as well as handle details for various individuals involved in the festival, including film guests, accredited professionals, press representatives, and more.

[Visit Cinetiq](https://app.cinetiq.aljoschazoeller.com/)

## Features

- **Content Management**: Add and manage films, series, and exhibitions.
- **Person Management**: Create and manage profiles for all individuals involved in the festival, including film guests, accredited professionals, press representatives, and more.

## Technologies Used

- **Backend**: Java, Spring Boot, Lombok
- **Frontend**: TypeScript, React, Vite, Chakra UI
- **Database**: MongoDB, Mongock for database migrations
- **State Management**: Zustand
- **Routing**: React Router
- **HTTP Client**: Axios
- **Authentication**: OAuth2 with GitHub
- **Containerization**: Docker (used in CI/CD with GitHub Actions)
- **Testing**: JUnit, Jest, React Testing Library, MockWebServer
- **Logging**: Better Stack
- **Static Analysis**: SonarCloud

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Java JDK
- Node.js
- MongoDB

### Installation
#### Backend Setup with IntelliJ IDEA:

1. **Clone the repository directly in IntelliJ IDEA:**
   - Open IntelliJ IDEA.
   - Select `File -> New -> Project from Version Control`.
   - In the dialog that appears, enter the URL of the repository:
     ```bash
     https://github.com/josch87/Cinetiq.git
     ```
   - Click `Clone`.

2. **Set up the development properties file:**
   - Navigate to `backend/src/main/resources` in the Project tool window.
   - Copy `application-development.properties.sample` and rename the copy to `application-development.properties`.
   - Open `application-development.properties` and fill in the required values.

3. **Import the Maven project:**
   - IntelliJ IDEA should automatically detect the `pom.xml` file in the `backend` directory and prompt you to import the Maven project. If not, right-click on the `pom.xml` file and select `Add as Maven Project`.

4. **Run the Spring Boot application:**
   - Open the `Maven` tool window (`View -> Tool Windows -> Maven`).
   - Expand the project's lifecycle in the Maven tool window.
   - Double-click on `spring-boot:run` to start the application.

#### Frontend Setup:

1. **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
2. **Install dependencies and start the Vite development server:**
    ```bash
    npm install
    npm run dev
    ```

### Running the Application

- Ensure MongoDB is running on your machine.
- Start the backend server as described in the Backend Setup section.
- Start the frontend server as described in the Frontend Setup section.
- Open your web browser and go to `http://localhost:5173` to access Cinetiq.

### Running Tests and Applications

In IntelliJ IDEA, you can directly run the following `.xml` files located in the `.run` folder in the root directory to facilitate various operations:

- **Frontend Tests**: Execute the corresponding `.xml` file to run frontend tests.
- **Backend Tests**: Execute the corresponding `.xml` file to run backend tests.
- **Backend Tests (Coverage)**: Execute the corresponding `.xml` file to run backend tests with coverage analysis.
- **Backend Application**: Execute the `.xml` file to start the backend application.
- **Frontend Application**: Execute the `.xml` file to start the frontend application.

## GitHub API Integration

- **Scheduled Data Retrieval**: GitHub API is integrated into the backend to retrieve data periodically from registered GitHub users within the application using scheduling.

## Acknowledgments

- Thanks to the open-source community for the tools and frameworks used in this project.

## Contact

For any inquiries or questions, feel free to contact me at [web.aljoschazoeller.com](https://web.aljoschazoeller.com/).
