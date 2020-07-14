import React from 'react';
//languages
import * as English from './English.json';
import * as Amharic from './Amharic.json';
//
export const lang = {en:English,am:Amharic};

export default React.createContext({lang,change:()=>{},chosen:''});