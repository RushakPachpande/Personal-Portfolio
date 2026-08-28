import { createContext, useContext } from 'react';

type DevModeContextValue = {
  unlocked: boolean;
};

export const DevModeContext = createContext<DevModeContextValue>({
  unlocked: false,
});

export function useDevMode() {
  return useContext(DevModeContext);
}
