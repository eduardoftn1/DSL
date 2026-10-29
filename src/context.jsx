import { createContext, useContext } from "react";

/* Compartilha com todas as seções: botões de compra, rolagem e aviso (toast). */
export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);
