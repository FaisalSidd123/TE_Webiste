import { createContext, useContext } from 'react';

/**
 * `revealed` flips to true the moment the preloader curtain starts opening.
 * Above-the-fold sections (Hero) wait for it before running their entrance.
 */
export const IntroContext = createContext({ revealed: true });

export const useIntro = () => useContext(IntroContext);
