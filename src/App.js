import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import { classNames } from './utils/general';
import { AdjustmentsIcon, BackspaceIcon, CloudDownloadIcon, CloudUploadIcon, CogIcon, ExclamationCircleIcon, EyeOffIcon, InformationCircleIcon, LockOpenIcon, SwitchHorizontalIcon, ViewGridAddIcon } from '@heroicons/react/outline'

function App() {
  const [count, setCount] = useState(0);
  const [cellLayer, setCellLayer] = useState(0);
  const [theme, setTheme] = useState(0);
  const [viewActive, setViewActive] = useState(false);
  const [uiActive, setUiActive] = useState(true);
  const [charMap, setCharMap] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [cellIndex, setCellIndex] = useState(0);
  const [cellMemory, setCellMemory] = useState(0);
  const inputRef = useRef(null);

  const themes = [
    ["55", "7f", "99"],
    ["cc", "5e", "22"],
    ["e6", "c7", "9c"],
    ["a9", "fc", "b5"],
    ["bf", "c6", "9f"],
    ["0f", "4f", "af"],
    ["99", "af", "7b"],
    ["5f", "7f", "7f"],
    ["bf", "fa", "af"],
    ["6b", "3f", "90"],
  ]



  const charMapClick = (i) => {
    return setCellIndex(i)
  }

  const keyToHexColor = (key) => {
    // get reverse alphabet index from key and convert to base 3
    const tBase = ' zyxwvutsrqponmlkjihgfedcba'.indexOf(key).toString(3).split("")
    // if its less than length 3 pad start with 0s
    if (tBase.length < 3) {
      tBase.unshift(...Array(3 - tBase.length).fill(0))
    }
    const [zero, one, two] = themes[theme]
    return "#" + tBase.map(i => i == 2 ? two : i == 1 ? one : zero).join("");
  }

  console.log(charMap.length);

  return (
    <div className="App">

      
      <div className="bg-black">
        <div className={classNames(uiActive? "opacity-100":"opacity-0","transition-all w-96 m-2 ring-4 ring-purple-700 rounded bg-purple-500 overflow-auto absolute text-purple-200 z-10")}>

          <h1 className="font-bold text-2xl m-2 px-5">StrCtrl.
          <span className="font-normal px-2">The String Visualiser</span>
          </h1>


          <div className="flex flex-row justify-center">
            <button 
            onClick={() => setViewActive(!viewActive)}
            className={
              classNames(viewActive?
              "hover:nm-inset-purple-500-lg nm-inset-purple-500-lg"
              :"hover:nm-inset-purple-500 nm-inset-purple-500-sm",
              "transition-all m-2 font-bold py-2 px-4 rounded"
            )}>
              <CloudUploadIcon className="w-6 h-6 inline-block mx-2" />
              IMPORT
            </button>
            <button 
            onClick={() => setViewActive(!viewActive)}
            className={
              classNames(viewActive?
              "hover:nm-inset-purple-500-lg nm-inset-purple-500-lg"
              :"hover:nm-inset-purple-500 nm-inset-purple-500-sm",
              "transition-all m-2 font-bold py-2 px-4 rounded"
            )}>
              <CloudDownloadIcon className="w-6 h-6 inline-block mx-2" />
              EXPORT</button>
              <button 
            onClick={() => setViewActive(!viewActive)}
            className={
              classNames(viewActive?
              "hover:nm-inset-purple-500-lg nm-inset-purple-500-lg"
              :"hover:nm-inset-purple-500 nm-inset-purple-500-sm",
              "transition-all m-2 font-bold py-2 px-4 rounded"
            )}>
              <CogIcon className="w-6 h-6 inline-block mx-2" />
              SETTINGS</button></div>
          <p>
            <ViewGridAddIcon className="w-6 h-6 inline-block mx-2" />
            Press any key (a-z) to add a character</p>
          <p>
            <BackspaceIcon className="w-6 h-6 inline-block mx-2" />
            Press backspace to remove a character</p>
          <p>
            <SwitchHorizontalIcon className="w-6 h-6 inline-block mx-2" />
            Use the arrow keys to move your selection</p>
          <p>
            <AdjustmentsIcon className="w-6 h-6 inline-block mx-2" />
            Press 1-9 to change between your themes</p>
          <p>
            <AdjustmentsIcon className="w-6 h-6 inline-block mx-2" />
            Press enter to descend a layer at selection</p>
          <p>
            <EyeOffIcon className="w-6 h-6 inline-block mx-2" />
            Press esc to toggle this UI and go to 0</p>
          <p>
            <ExclamationCircleIcon className="w-6 h-6 inline-block mx-2" />
            You get a maximum of 144 characters</p>
          <p className="font-bold">
            <InformationCircleIcon className="w-6 h-6 inline-block mx-2" />
            You're at {cellIndex} on layer {cellLayer}</p>
        </div>
        <input onBlur={
          () => setTimeout(() => inputRef.current.focus(), 20)
        } ref={inputRef}
          className="sr-only"
          autoFocus
          autoComplete="off"
          type="text"
          onKeyPress={(e) => {
            if(isNaN(parseInt(e.key))) {
            if (modifying) {
              const modifiedChar = charMap.at(-1) + e.key;
              setCharMap([...charMap.slice(0, -1), modifiedChar]);
            }
            else {
              if (charMap.length < 144) {
                setCharMap([...charMap, e.key]);
              }

            }
          }
          }}
          onKeyDown={(e) => {
            if(parseInt(e.key) > 0 && parseInt(e.key) < 10) {
              setTheme(parseInt(e.key));
            }
            if (e.key === 'Backspace') {
              if (charMap.length !== 0) {
                setCellIndex(charMap.length - 2);
                setCharMap(charMap.slice(0, -1))
              }
            }
            if (e.key === 'Shift') {

              setModifying(true)
            }
            if (e.key === 'ArrowLeft') {
              if (cellIndex != 0) setCellIndex(cellIndex - 1);
            }
            if (e.key === 'ArrowRight') {
              if (cellIndex + 1 < charMap.length) setCellIndex(cellIndex + 1);
            }
            if (e.key === 'ArrowDown') {
              const interval = Math.ceil(Math.sqrt(charMap.length))
              if (cellIndex + interval < charMap.length) setCellIndex(cellIndex + interval);
            }
            if (e.key === 'ArrowUp') {
              const interval = Math.ceil(Math.sqrt(charMap.length))
              if (cellIndex - interval >= 0) setCellIndex(cellIndex - interval);
            }
            if (e.key === 'Escape') {
              setUiActive(!uiActive)
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
        
        <ul className={classNames( //! TAILWIND JIT MADE ME DO THIS IM SORRY
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
              <div style={{ backgroundColor: keyToHexColor(char) }} className={classNames(
                i === cellIndex ? 'shadow-inner z-40' : '',
                "transition-all group block h-full")}>
                <div alt="" className="code object-cover pointer-events-none group-hover:opacity-75">
                  <ul className="grid grid-cols-2 gap-0">
                    <li className="text-center">
                      <p className="text-2xl text-white">{char}</p>
                    </li>
                    <li className="text-center">
                      <p className="text-2xl text-white">{keyToHexColor(char)}</p>
                    </li>
                  </ul>
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
