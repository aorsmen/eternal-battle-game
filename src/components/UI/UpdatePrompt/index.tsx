import { useRegisterSW } from "virtual:pwa-register/react";
import {
  PromptWrapper,
  PromptText,
  PromptActions,
  PromptButton,
} from "./styled.components";

const UPDATE_CHECK_MS = 60 * 60 * 1000;

// Registers the service worker and tells the player when the game is ready
// offline, or when a new version is waiting. The new version only loads when
// they press Reload, so a battle in progress is never cut short
const UpdatePrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // Installed apps can stay open for days, so look for updates hourly
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      setInterval(() => {
        if (navigator.onLine) registration.update();
      }, UPDATE_CHECK_MS);
    },
  });

  if (!offlineReady && !needRefresh) return null;

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <PromptWrapper>
      <PromptText
        title={needRefresh ? "Update available" : "Ready to play offline"}
        text={
          needRefresh
            ? "A new version of Eternal Battle is ready."
            : "Eternal Battle now works without a connection."
        }
      />
      <PromptActions>
        {needRefresh && (
          <PromptButton primary onClick={() => updateServiceWorker(true)}>
            Reload
          </PromptButton>
        )}
        <PromptButton onClick={close}>
          {needRefresh ? "Later" : "OK"}
        </PromptButton>
      </PromptActions>
    </PromptWrapper>
  );
};

export default UpdatePrompt;
