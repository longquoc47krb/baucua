import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'odometer/themes/odometer-theme-default.css';
import Layout from './screens/Layout';
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>)
}

export default App
