# RestauBot Frontend

A modern restaurant management and ordering platform built with [Next.js](https://nextjs.org). This frontend application provides a comprehensive interface for customers, administrators, and restaurant staff to manage menus, orders, analytics, and user accounts.

## Project Description

RestauBot is a full-featured restaurant management system designed to streamline operations and enhance customer experience. The frontend serves as the primary interface for all user interactions, including browsing menus, placing orders, tracking order status, and managing restaurant operations.

## Features

- **User Authentication**: Secure sign-up and sign-in using Clerk
- **Menu Management**: Create, edit, and organize restaurant menu items
- **Order Management**: Browse menus, place orders, and track order status in real-time
- **Dashboard**: Personalized user dashboard with order history
- **Administrator Panel**: Full administrative controls for managing users, orders, and analytics
- **Analytics View**: Comprehensive analytics dashboard for restaurant insights
- **Order Status Tracking**: Real-time order status updates with visual indicators
- **User Management**: Manage user roles and permissions
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **WhatsApp Integration**: Customer support via WhatsApp conversations
- **FAQ Section**: Self-service knowledge base for customers

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (or yarn/pnpm as alternatives)
- **Git**: For version control
- **.env.local**: Environment variables file with required configuration
  - Clerk authentication keys
  - API endpoints
  - Database connection details


The application will be available at [http://localhost:3000](http://localhost:3000).


## Project Structure

- **`src/app/`** - Next.js App Router pages and layouts
- **`src/components/`** - Reusable React components
- **`src/api/`** - API client and integration helpers
- **`src/hooks/`** - Custom React hooks
- **`src/utils/`** - Utility functions and helpers
- **`src/types/`** - TypeScript type definitions
- **`public/`** - Static assets
- **`tests/`** - Test files

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Feedback and contributions welcome

## Deploy on Vercel

The easiest way to deploy this Next.js application is on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
