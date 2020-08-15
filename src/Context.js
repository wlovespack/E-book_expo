import React from "react";
//languages
import * as English from "./Language/English.json";
import * as Amharic from "./Language/Amharic.json";
import * as Default from "./Theme/Default.json";
import * as Light from "./Theme/Light.json";
import * as Dark from "./Theme/Dark.json";
//
export const lang = { en: English, am: Amharic };
export const Themes = { default: Default, light: Light, dark: Dark };
//
export default React.createContext({
  lang: lang.en,
  changeChosenLanguage: () => {},
  chosenLanguage: "",
  continueReading: true,
  recommendation: true,
  theme: Themes.default,
  changeTheme: () => {},
  chosenTheme: "",
});
