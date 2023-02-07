import { useState, useMemo, useCallback } from "react";
import { extendTheme, useMediaQuery} from "@chakra-ui/react";
import { createContext } from "react";
import {css} from "@emotion/react";


export const ModeContext = createContext<{
  mode: "dark" | "light";
  toggleMode: () => void;
  smallDevice:boolean
}>({
  mode: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleMode: () => { },
  smallDevice: false
});


export const SideBarShadow = (mode: "light" | "dark") => css`
  box-shadow: ${mode === "light"
    ? "0.2rem 0.5rem 0.5rem rgba(0, 0, 0, 0.06)"
    : "1rem 1rem 1rem rgba(0, 0, 0, 0.09)"};
  border-radius: 1.5rem;
  background-image: ${mode === "dark" ? "linear-gradient(80deg,rgba(0, 0, 0, 0.06),rgba(25, 25, 25))" : ""};
  height: 100vh;

  @media (max-width: 40em) {
    height: auto;
  }
`;


export const CustomBoxShadow = (mode: "light" | "dark") => css`
  box-shadow: ${mode === "light"
    ? "-0.2rem 0.5rem 0.5rem rgba(0, 0, 0, 0.06)"
    : "-1rem 1rem 2rem rgba(0, 0, 0, 0.4)"};
  border-radius: 1.5rem;
  background-image: ${mode === "dark" ? "linear-gradient(10deg,rgba(0, 0, 0, 0.06),rgba(25,25,25))" : "" }
`;




export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        blackAccent: {
          100: "#1a1918",
          200: "#090707",
          300: "#000000",
        },
        whiteAccent: {
          100: "#575757",
          200: "#b3b3b3",
          400: "#ffffff",
          300: "#bfbebb",
        },
        orangeAccent: {
          100: "#ac4c2e",
          200: "#bd533e",
        },
        yellowAccent: {
          100: "#e7c38f",
          200: "#c99652",
        },
      }
    : {
        blackAccent: {
          100: "#000000",
          200: "#090707",
          300: "#1a1918",
        },
        whiteAccent: {
          400: "#575757",
          300: "#b3b3b3",
          100: "#ffffff",
          200: "#bfbebb",
        },
        orangeAccent: {
          200: "#ac4c2e",
          100: "#bd533e",
        },
        yellowAccent: {
          200: "#e7c38f",
          100: "#c99652",
        },
      }),
});


const themeSettings = (mode: string) => {
  const colors = tokens(mode);
  return {
    styles: {
      ...(mode === "dark"
        ? {
            global: {
              "html, body": {
                bg: colors.blackAccent[100],
                color: colors.whiteAccent[200],
              },
              "*:focus": {
                color: colors.whiteAccent[400],
              },
            },
          }
        : {
            global: {
              "html,body": {
                bg: colors.whiteAccent[100],
                color: colors.whiteAccent[100],
              },
              "*:focus": {
                fontWeight: "bold",
              },
              "*": {
                color: colors.blackAccent[100],
              },
            },
          }),
    },
  };
};


export const useMode = () => {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const themeSettingsResult = themeSettings(mode);
  const theme = useMemo(() => extendTheme(themeSettingsResult), [mode]);
  const toggleMode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode]);
  const [smallDevice] = useMediaQuery("(max-width: 70rem)");
  return { theme, mode, toggleMode, smallDevice};
};
