import React, {useState} from 'react'
import NoteContext from './NoteContext.js'

function NoteState(props) {
    const [isshown,setIsShown]=useState(0);
    const [count,setCount] = useState(0);
    const [city,setCity]= useState(0);
    const [login,setLogin]=useState(false);

  return (
    <NoteContext.Provider value={{isshown,setIsShown, count,setCount,city,setCity,login,setLogin}}>
      {props.children}

    </NoteContext.Provider>
  )
}


export default NoteState;

