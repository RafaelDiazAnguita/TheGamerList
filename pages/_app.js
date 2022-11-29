import '../styles/globals.css'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Component {...pageProps} />      
    </LocalizationProvider>
  )
}

export default MyApp
