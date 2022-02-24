import React,{useContext, useEffect} from "react";
import UIContext from '../context/UIContext';

export const useHiddeMenu = (hidden: boolean) => {
  const {hiddeMenu, hiddenMenu, showMenu} = useContext(UIContext);

    useEffect(() => {
     if(hidden){
       hiddeMenu();
    }else{
        showMenu();
      }
    }, [hidden, showMenu, hiddeMenu])
    
};
