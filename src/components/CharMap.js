import { useEffect, useState } from "react";
import { classNames } from "../utils/general";

const CharMap = ({char, index}) => {

    const [ cellIndex, setCellIndex ] = useState(index);
    
    const [ charMap, setCharMap ] = useState([]);

    const [theme, setTheme] = useState(0);

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


    return (
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
                    <span className="text-white">{char}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
    )
}

export default CharMap;