import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { gameTheme } from "../config/general";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

export const renderWithProviders = (
  ui: React.ReactNode,
  {
    renderOptions = {},
    withRouter = false,
  }: {
    renderOptions?: any;
    withRouter: boolean;
  }
) => {
  const content = withRouter ? <BrowserRouter>{ui}</BrowserRouter> : ui;

  return render(
    <ThemeProvider theme={gameTheme}>
      <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>
    </ThemeProvider>,
    renderOptions
  );
};
