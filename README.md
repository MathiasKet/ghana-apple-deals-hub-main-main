# Ghana Apple Deals Hub

An e-commerce platform for Apple products in Ghana, built with React, TypeScript, and Supabase.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fghana-apple-deals-hub)

## Features

- 🛍️ Product listing with filtering and search
- 🔍 Product details with image gallery
- 🛒 Shopping cart management
- 💝 Wishlist functionality
- 👤 User authentication
- 📱 Responsive design
- 🌐 Supabase integration
- 🚀 Deployed on Vercel
- ✨ Modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Supabase (Auth & Database)
- Tailwind CSS
- React Router
- React Query
- Vercel for deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+
- Supabase account (free tier available at [supabase.com](https://supabase.com))
- Vercel account (free tier available at [vercel.com](https://vercel.com))

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ghana-apple-deals-hub.git
   cd ghana-apple-deals-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials from your project settings

4. Start the development server:
   ```bash
   npm run dev
   ```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to find your:
   - Project URL (use as `VITE_SUPABASE_URL`)
   - Anon/public key (use as `VITE_SUPABASE_ANON_KEY`)
3. Set up authentication providers in the Authentication > Providers section
4. Configure your database tables as needed

### Vercel Deployment

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add these environment variables in Vercel:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Deploy!

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Building

Build for production:
```bash
npm run build
```

Preview the build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable components
├── contexts/        # React contexts
├── hooks/          # Custom hooks
├── lib/            # Configuration and utilities
├── pages/          # Route components
├── services/       # API and service functions
├── test/           # Test utilities
└── types/          # TypeScript types
```

## State Management

The application uses React Context API for state management:

- `AuthContext`: User authentication state
- `CartContext`: Shopping cart state
- `WishlistContext`: Wishlist state
- `ProductContext`: Product data and filtering

## Testing

- Unit tests for components and hooks
- Integration tests for contexts
- E2E tests for critical user flows
- Code coverage reporting with Codecov

## CI/CD

GitHub Actions workflow includes:

- Code linting
- Unit testing
- Code coverage reporting
- Automated deployment to Firebase
- Preview deployments for pull requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
