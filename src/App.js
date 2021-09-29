import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import { classNames } from './utils/general';

function App() {
  const [count, setCount] = useState(0);
  const [ charMap, setCharMap ] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [ cellIndex, setCellIndex ] = useState(0);
  const [ cellMemory, setCellMemory ] = useState(0);
  const inputRef = useRef(null);

  const text = {
    ctrl: "select multiple cells",
    alt: "toggle UI",
    shift: "toggle mix/match",
    enter: "generate",
    numbers: "themes",
    letters: "new cell",
  }

  const themes = {
    base: ["55", "7f", "99"],
    dark: ["cc", "5e", "22"]
  };

  const keyToHexColor = (key) => {
    // get reverse alphabet index from key and convert to base 3
    const tBase = ' zyxwvutsrqponmlkjihgfedcba'.indexOf(key).toString(3).split("")
    // if its less than length 3 pad start with 0s
    if (tBase.length < 3) {
      tBase.unshift(...Array(3 - tBase.length).fill(0))
    }
    const [ zero, one, two ] = themes.base
    return "#" + tBase.map(i => i==2? two: i==1? one : zero).join("");
  }

  console.log(charMap.length);

  return (
    <div className="App">
      <div className="bg-black">
      <div className="controls bg-purple-500 absolute text-white z-10">
            <p>press any key (a-z) to add a character</p>
            <p>press backspace to remove a character</p>
            <p>use the arrow keys to select a character</p>
            <p>you get a maximum of 144 characters</p>
            <p>you've used {charMap.length} and you're at {cellIndex}</p>
          </div>
        <input onBlur={
          () => setTimeout(() => inputRef.current.focus(), 20)
        } ref={inputRef} 
        className="sr-only"
        autoFocus
        type="text"
        onKeyPress={(e) => {
          if(modifying) {
            const modifiedChar = charMap.at(-1) + e.key;
            setCharMap([...charMap.slice(0, -1), modifiedChar]);
          }
          else {
            if(charMap.length < 144) {
              setCharMap([...charMap, e.key]);
            }
            
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            if(cellIndex == charMap.length -1) {
              setCellIndex(cellIndex - 1);
            }
            setCharMap(charMap.slice(0, -1))
          }
          if (e.key === 'Shift') {
            
            setModifying(true)
          }
          if (e.key === 'ArrowLeft') {
            if(cellIndex != 0) setCellIndex(cellIndex - 1);
          }
          if (e.key === 'ArrowRight') {
            if(cellIndex+1 != charMap.length) setCellIndex(cellIndex + 1);
          }
          if (e.key === 'ArrowDown') {
            const interval = Math.ceil(Math.sqrt(charMap.length))
            if(cellIndex + interval < charMap.length) setCellIndex(cellIndex + interval);
          }
          if (e.key === 'ArrowUp') {
            const interval = Math.ceil(Math.sqrt(charMap.length))
            if(cellIndex - interval >= 0) setCellIndex(cellIndex - interval);
          }
          if(e.key === 'Escape') {
            setCellMemory(cellIndex)
            setCellIndex(0)
          }

        }}
        onKeyUp={(e) => {
          if (e.key === 'Shift') {
            setModifying(false)
          }
        }}
        />    
        <ul className={classNames(
          charMap.length <= 2 ? "grid-cols-1" : 
          charMap.length <= 4 ? "grid-cols-2" :
          charMap.length <= 9 ? "grid-cols-3" :
          charMap.length <= 16 ? "grid-cols-4" :
          charMap.length <= 25 ? "grid-cols-5" :
          charMap.length <= 36 ? "grid-cols-6" :
          charMap.length <= 49 ? "grid-cols-7" :
          charMap.length <= 64 ? "grid-cols-8" :
          charMap.length <= 81 ? "grid-cols-9" :
          charMap.length <= 100 ? "grid-cols-10" :
          charMap.length <= 121 ? "grid-cols-11" :
          charMap.length <= 144 ? "grid-cols-12" :
          "grid-cols-12",
          "h-screen grid gap-x-0 gap-y-0")}
        >
        {charMap.map((char, i) => (
          <li onClick={() => setCellIndex(i)} key={i} className="relative">
            <div style={{backgroundColor: keyToHexColor(char)}} className={classNames(
              i === cellIndex ? 'shadow-inner z-40' : '',
              "transition-all group block h-full")}>
              <div alt="" className="code object-cover pointer-events-none group-hover:opacity-75">
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
