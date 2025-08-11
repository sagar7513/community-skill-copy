A full-stack web application where people can offer skills they know and find skills they want to learn.
The platform matches users based on mutual skill exchange — if you offer a skill someone wants and they offer a skill you want, you both get matched.


Features:

📝 Skill Management — Add new skills and view a list of available skills.
👤 User Profiles — Create a user profile with offered and wanted skills.
🔍 Smart Matching — Find people who can teach you something you want and who want something you can teach.
⚡ Caching with Redis — Faster loading of frequently requested skills.
🗄 PostgreSQL Database — Persistent and structured storage of skills and users.
🐳 Dockerized — Easy to run locally with Docker Compose.
🎨 Responsive UI — Clean, modern interface built with React.


Tech Stack:

Frontend:
React.js
HTML5, CSS3
Fetch API for backend communication

Backend:
Node.js
Express.js
PostgreSQL (via pg library)
Redis (via ioredis)
CORS & Body Parser
dotenv for environment config

DevOps & Others:
Docker & Docker Compose
ESLint (optional for linting)
JSONB fields in PostgreSQL for flexible skill lists
