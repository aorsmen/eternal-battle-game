import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MainContext } from "../store/Main";
import { MainContextType } from "../types/main.types";
import { gameTheme } from "../config/general";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

export const renderMainContext = (
  ui: React.ReactNode,
  {
    providerProps,
    renderOptions = {},
    withRouter = false,
  }: {
    providerProps: { value: MainContextType };
    renderOptions?: any;
    withRouter: boolean;
  }
) => {
  const content = withRouter ? <BrowserRouter>{ui}</BrowserRouter> : ui;

  return render(
    <ThemeProvider theme={gameTheme}>
      <QueryClientProvider client={queryClient}>
        <MainContext.Provider value={providerProps.value}>
          {content}
        </MainContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>,
    renderOptions
  );
};
