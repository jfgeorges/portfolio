import "../src/styles/globals.css";
import "../src/styles/theme.css";
import { ThemeProvider, useTheme } from "../src/context/ThemeProvider";

// ATTENTION : créer un composant fils de ThemeProvider pour avoir accès au context appelé avec useTheme()
const AppWithTheme = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div id="app" className={theme}>
      {children}
    </div>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <AppWithTheme>
        <div className="m-auto h-full max-w-7xl px-4">
          <Component {...pageProps} />
        </div>
      </AppWithTheme>
    </ThemeProvider>
  );
};

export default MyApp;
