# Celestia Art Store — E-commerce Web Application 🌌

This is an e-commerce project created by the **`200 OK team`** as part of the [Rolling Scopes School](https://rs.school/) course. The project simulates a real-world online store using modern frontend technologies and an API-first commerce backend, providing hands-on experience in building a fully functional web store.

## 🖼️ About The Project

**Celestia Art** is a luxury fine art store selling framed and unframed art. Our goal is to offer a user-friendly platform for art enthusiasts to browse and purchase high-quality artwork. The project is designed to bring together a beautiful collection of thematic art, focusing on astronomy, architecture, and fine art, while providing an intuitive and smooth e-commerce experience.

## 🛠️ Built With

| Technology        | Badge                                                                                         |
|-------------------|-----------------------------------------------------------------------------------------------|
| **React**         | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)    |
| **TypeScript**    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Vite**          | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)                   |
| **ESLint**        | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)             |
| **Prettier**      | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)       |
| **Vitest**        | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)             |
| **Commercetools** | ![Commercetools](https://img.shields.io/badge/commercetools-512DA8)                           |

## 🚀 Quick Start

Get the project up and running in just a few steps:

### Prerequisites

- Node.js v18.x or higher
- Git
- Commercetools Account ([Sign up here](https://commercetools.com/))

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/DmitriyIshchenko/eCommerce-App.git
    ```
    
2. Navigate to the project folder

    ```bash
    cd eCommerce-App
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Configure Commercetools

    Create a `.env` file in the root directory and add your Commercetools API credentials:

    ```bash
    VITE_CT_PROJECT_KEY=<your_project_key>
    VITE_CT_CLIENT_ID=<your_client_id>
    VITE_CT_CLIENT_SECRET=<your_client_secret>
    VITE_CT_API_URL=<api_url>
    VITE_CT_AUTH_URL=<auth_url>
    ```

5. Run the project

    ```bash
    npm run dev
    ```

## 🔁 Useful Commands

The following scripts are available in the project and can be run using `npm run <script>`:

| Script          | Description                                              |
|-----------------|----------------------------------------------------------|
| `dev`           | Starts Vite for development.                             |
| `build`         | Builds the project for production using Vite.            |
| `format`        | Formats files using Prettier.                            |
| `ci:format`     | Checks code formatting with Prettier.                    |
| `preview`       | Previews the project using Vite.                         |
| `ci:lint`       | Runs ESLint to check for linting errors.                 |
| `lint`          | Runs ESLint and automatically fixes fixable issues.      |
| `prepare`       | Installs Husky in the project directory.                 |
| `test`          | Runs tests using Vitest.                                 |
| `coverage:test` | Runs tests and generates a coverage report using Vitest. |

## 🐾 Authors

- 👨‍💻 [**Dmitriy Ishchenko**](https://github.com/DmitriyIshchenko)
- 👩‍💻 [**Ekaterina Gribova**](https://github.com/KateGribova)
- 👩‍💻 [**Olga Dubodel**](https://github.com/olydbd)
