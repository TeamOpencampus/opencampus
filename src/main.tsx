import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';

const theme = extendTheme({
  fonts: {
    heading: 'Lora, serif',
    body: 'Work Sans, sans-serif',
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
