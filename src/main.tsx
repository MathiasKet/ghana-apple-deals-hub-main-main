import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Toaster position="top-center" richColors />
      <App />
    </Router>
  </QueryClientProvider>
);
