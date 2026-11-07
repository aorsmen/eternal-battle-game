// @ts-nocheck
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import UpdatePrompt from ".";

const state = vi.hoisted(() => ({
  offlineReady: false,
  needRefresh: false,
  setOfflineReady: vi.fn(),
  setNeedRefresh: vi.fn(),
  updateServiceWorker: vi.fn(),
}));

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: () => ({
    offlineReady: [state.offlineReady, state.setOfflineReady],
    needRefresh: [state.needRefresh, state.setNeedRefresh],
    updateServiceWorker: state.updateServiceWorker,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  state.offlineReady = false;
  state.needRefresh = false;
});

test("Should render nothing until there is news", () => {
  const { container } = render(<UpdatePrompt />);

  expect(container).toBeEmptyDOMElement();
});

test("Should say when the game works offline", () => {
  state.offlineReady = true;
  render(<UpdatePrompt />);

  expect(screen.getByRole("status")).toHaveTextContent(
    /ready to play offline/i
  );
  fireEvent.click(screen.getByRole("button", { name: "OK" }));
  expect(state.setOfflineReady).toHaveBeenCalledWith(false);
});

test("Should reload into the new version only when asked", () => {
  state.needRefresh = true;
  render(<UpdatePrompt />);

  expect(screen.getByRole("status")).toHaveTextContent(/update available/i);
  fireEvent.click(screen.getByRole("button", { name: "Later" }));
  expect(state.setNeedRefresh).toHaveBeenCalledWith(false);
  expect(state.updateServiceWorker).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button", { name: "Reload" }));
  expect(state.updateServiceWorker).toHaveBeenCalledWith(true);
});
