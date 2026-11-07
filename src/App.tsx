import { lazy } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { gameTheme } from "./config/general";
import UpdatePrompt from "./components/UI/UpdatePrompt";

const Home = lazy(() => import("./views/Home"));
const Herodex = lazy(() => import("./views/Herodex"));
const HerodexList = lazy(() => import("./views/HerodexList"));
const Character = lazy(() => import("./views/Character"));
const Compare = lazy(() => import("./views/Compare"));
const Battle = lazy(() => import("./views/Battle"));
const SideSelect = lazy(() => import("./views/SideSelect"));
const Gameplay = lazy(() => import("./views/Gameplay"));
const Credits = lazy(() => import("./views/Credits"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={gameTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="herodex" element={<Herodex />}>
              <Route index element={<HerodexList />} />
              <Route path="compare" element={<Compare />} />
              <Route path=":id" element={<Character />} />
            </Route>
            <Route path="battle" element={<Battle />}>
              <Route index element={<SideSelect />} />
              <Route path="play" element={<Gameplay />} />
            </Route>
            <Route path="credits" element={<Credits />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <UpdatePrompt />
    </ThemeProvider>
  );
};

export default App;
