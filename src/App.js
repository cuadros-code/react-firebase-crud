import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppRouter } from './routes/AppRouter';
import { theme } from './theme-material-ui';

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <AppRouter />
      </MuiThemeProvider>
    </>
  );
}

export default App;
