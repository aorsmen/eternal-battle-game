import { lazy } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { gameTheme } from "./config/general";

const Home = lazy(() => import("./views/Home"));
const Herodex = lazy(() => import("./views/Herodex"));
const Gameplay = lazy(() => import("./views/Gameplay"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={gameTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="herodex" element={<Herodex />} />
            <Route path="battle" element={<Gameplay />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
