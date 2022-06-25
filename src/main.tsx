import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider, QueryFunction } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';

const theme = extendTheme({
  fonts: {
    heading: 'Lora, serif',
    body: 'Poppins, sans-serif',
  },
});

const defaultQueryFn: QueryFunction = ({ queryKey }) =>
  axios
    .get(queryKey.at(0)! as string, {
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')!)?.token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw err;
      }
    });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <NiceModal.Provider>
            <BrowserRouter>
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </BrowserRouter>
          </NiceModal.Provider>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
