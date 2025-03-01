# DevPitch Frontend

DevPitch is a platform where engineering and computer science students can pitch their ideas, showcase their ongoing or completed projects, and collaborate with others. This repository contains the frontend code for the DevPitch platform.

## Features
- User authentication (Signup/Login)
- Project showcasing (Upload and manage projects)
- Idea pitching (Share new ideas for feedback)
- Collaboration requests (Request to join or contribute to projects)
- Search and filter projects by category, technology, or popularity
- User profiles displaying projects and contributions

## Tech Stack
- **Framework:** Next.js (React-based framework for fast, SEO-friendly applications)
- **UI Library:** Tailwind CSS for responsive and modern design
- **State Management:** Context API or Redux (as needed)
- **Authentication:** Github OAuth
- **API Handling:** Axios for HTTP requests
- **Backend Integration:** Connects with Express.js backend

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/nooorf/DevPitch-frontend.git
   cd devpitch-frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Create an `.env.local` file in the root directory and add environment variables (e.g., API base URL, authentication keys).

4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## License
This project is licensed under the MIT License. See the `LICENSE` file for details.


