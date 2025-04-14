import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GameContext } from "../store/Game";
import { GameContextType } from "../types/game.types";
import { gameTheme } from "../config/general";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

export const renderGameContext = (
  ui: React.ReactNode,
  {
    providerProps,
    renderOptions = {},
    withRouter = false,
  }: {
    providerProps: { value: GameContextType };
    renderOptions?: any;
    withRouter: boolean;
  }
) => {
  const content = withRouter ? <BrowserRouter>{ui}</BrowserRouter> : ui;

  return render(
    <ThemeProvider theme={gameTheme}>
      <QueryClientProvider client={queryClient}>
        <GameContext.Provider value={providerProps.value}>
          {content}
        </GameContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>,
    renderOptions
  );
};
