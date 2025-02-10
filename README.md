# Strapi CMS with Next.js Frontend

A modern, scalable web application utilizing **Strapi** as a headless CMS and **Next.js** for a performant and dynamic frontend. This repository also integrates **GraphQL Code Generator**, **TanStack React Query**, and two powerful UI libraries: **daisyUI** and **shadcn/ui** for streamlined UI development.

---

## Features

- **Headless CMS**: Manage and organize your content effortlessly using Strapi.
- **Next.js Frontend**: Fast and SEO-friendly frontend with SSR and SSG support.
- **GraphQL Integration**: Fetch data using GraphQL API with TypeScript types and hooks.
- **React Query**: Simplified data fetching and caching with `@tanstack/react-query`.
- **UI Libraries**: Pre-styled components with **daisyUI** and **shadcn/ui**.
- **Responsive Design**: Mobile-first UI for all devices.
- **Authentication**: User authentication and role-based access management via Strapi.
- **Customizable**: Flexible backend and frontend for specific business needs.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **CMS**: [Strapi](https://strapi.io/)
- **GraphQL**: Managed with Apollo Client and GraphQL Code Generator
- **React Query**: Data fetching with caching and updates
- **UI Libraries**: [daisyUI](https://daisyui.com/) and [shadcn/ui](https://ui.shadcn.dev/)
- **Styling**: TailwindCSS with component libraries
- **Database**: SQLite (default), with options for MySQL, PostgreSQL, or MongoDB
- **Deployment**: Vercel (frontend) and Render/Heroku/DigitalOcean (backend)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [Yarn](https://yarnpkg.com/) or pnpm
- [Docker](https://www.docker.com/) (optional, for containerized environments)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

- **Backend Strapi**
```bash
cd your-cms-folder
yarn install
```

- **Frontend (Next.js)**
```bash
cd your-frontend-folder
yarn install
```

### 3. Configure Environment Variables

- **Backend Strapi**
- env
```bash
DATABASE_CLIENT=mysql
DATABASE_HOST=0.0.0.0
DATABASE_PORT=your-port
DATABASE_NAME=database-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=database-password
DATABASE_SSL=false (optional)
DATABASE_FILENAME=
JWT_SECRET=your-secret-key
```

- **Frontend (Next.js)**
- env
```bash
NEXT_PUBLIC_API_URL=http://localhost:1337
```

### Run

- **Backend Strapi**
```bash
yarn develop
```

- **Frontend NextJS**
```bash
yarn codegen --watch
yarn dev
```
