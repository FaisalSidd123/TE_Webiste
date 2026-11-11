import { createContext, useContext } from 'react';

/**
 * `revealed` flips to true the moment the preloader curtain starts opening.
 * Above-the-fold sections (Hero) wait for it before running their entrance.
 * `ready` flips once the preloader is gone and scrolling is unlocked.
 */
export const IntroContext = createContext({ revealed: true, ready: true });

export const useIntro = () => useContext(IntroContext);
