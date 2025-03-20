import { createContext,useState } from "react";

export const HistoryVideoContext=createContext();

export function HistoryVideoContextProvider({children}){

 const [historyVideos,setHistoryVideos]=useState(null); 
 return(
    <HistoryVideoContext.Provider value={{historyVideos,setHistoryVideos}}>
        {children}
    </HistoryVideoContext.Provider>
 )
}