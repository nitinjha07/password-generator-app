import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const[len, setLen] = useState(8);
  const [password, setpassword] = useState("");
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const lengthHandler = event => setLen(event.target.value);

  const passwordGenerator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "~!@#$%^&*()-_+=[]{}|;:',.<>?/";

    if(isNumAllowed) str += num;
    if(isCharAllowed) str += char;

    for(let i = 0; i < len; i++){
      let ch = Math.floor(Math.random()*(str.length));
      pass += str[ch];
    }

    setpassword(pass);
  }

  const copyPassToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  }

  useEffect(() => {
    passwordGenerator()
  }, [len,isNumAllowed, isCharAllowed])


  return (
    <div className='w-full h-screen bg-[#1B262C] flex flex-col justify-center items-center gap-10'>
      <h1 className='head text-5xl bg-[#90D26D] rounded-md px-8 py-3 absolute top-32 font-bold text-[#111] shadw- shadow-red-200'>Password Generator</h1>

      <div className='p-16 bg-[#323556]  rounded-md'>
        <div className='relative'>
          <input type="text" readOnly value={password} className='text-black w-[40rem] h-10 rounded-sm text-xl font-semibold p-2'/>
          {isVisible && (<div className='absolute flex ap-3 items-center top-0 right-28'>
            <img src="src\assets\icons8-tick.gif" alt="tick" className='w-10' />
            <p className='text-green-600 font-semibold'>Text Copied</p>
          </div>)}
          <button onClick = {copyPassToClipboard} className='text-white bg-blue-500 rounded-sm text-xl h-10 px-5 ml-4 font-semibold hover:bg-blue-600 active:bg-blue-700 transition-all duration-150'>Copy</button>
        </div>
        <div className='flex gap-5 bg-[#90D26D] w-[46.5rem] h-16 rounded-sm items-center justify-around text-xl mt-4'>
          <div>
            <input type="range" onChange={lengthHandler} value={len} min={1} max={20} className='mx-2 range-scrollbar'/>
            <label>Length : {len}</label>
          </div>

          <div className='flex gap-2 items-center'>
            <input type="checkbox" onChange={() => setIsNumAllowed(!isNumAllowed)} className='size-5'/>
            <label>Numbers</label>
          </div>

          <div className='flex gap-2 items-center'>
            <input type="checkbox" onChange={() => setIsCharAllowed(!isCharAllowed)} className='size-5'/>
            <label>Special Characters</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
