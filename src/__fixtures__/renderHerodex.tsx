import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router";
import { gameTheme } from "@/config/general";
import Herodex from "@/views/Herodex";
import HerodexList from "@/views/HerodexList";
import Character from "@/views/Character";
import Compare from "@/views/Compare";

// Renders the Herodex routes (layout + list + compare + character) at `path`, with a
// fresh query client so every test fetches its own data
export const renderHerodex = (path = "/herodex") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <ThemeProvider theme={gameTheme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="herodex" element={<Herodex />}>
              <Route index element={<HerodexList />} />
              <Route path="compare" element={<Compare />} />
              <Route path=":id" element={<Character />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
