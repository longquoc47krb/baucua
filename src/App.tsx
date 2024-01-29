import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './screens/Layout';
import 'odometer/themes/odometer-theme-default.css';
function App() {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>
    <Layout />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>

}

export default App
