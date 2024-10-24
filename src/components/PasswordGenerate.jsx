import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function PasswordGenerate() {

  const [length,setLength] = useState(8)
  const [allowedNumber,setAllowedNumber] = useState(false)
  const [allowedChar,setAllowedChar] = useState(false)
  const [password,setPassword] = useState('')

  
  

  const passsowrdRef = useRef(null) 

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzllowedNumber"

    if(allowedNumber) str += "0123456789" 
    if(allowedChar) str += "!@#$%^&*()~`{}[],."

    for (let i = 1; i<= length; i++){
    
      let char = Math.floor(Math.random() * str.length + 1 )

      pass += str.charAt(char)

    }

    setPassword(pass)
  },[length,allowedNumber,allowedChar,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passsowrdRef.current.select()
    passsowrdRef.current.setSelectionRange(0,password.length)
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  },[password])

 

useEffect(()=>{
  passwordGenerator()
}, [length,allowedNumber,allowedChar,passwordGenerator])



  return (
    <div >
      <div className='w-full max-w-md mx-auto   shadow-md rounded-lg px-5 py-5 my-8 text-orange-500 bg-gray-500  '>
      <h1 className='text-center text-white my-3 '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
         <input type="text"
         value={password}
         className='outline-none w-full py-1 px-3 '
         placeholder='password'
         readOnly
         ref={passsowrdRef}
        
         />  
         <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
         onClick={copyPasswordToClipboard}
         
         >
          copy
          </button>         
        </div>
        <div className='flex text-sm gap-x-2 '> 
          <div className='flex items-center gap-x-1'> 
            <input 
            type="range"
            min={6}
            max={100} 
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
             />
            
            <label >length: {length}</label>
            
          </div>
          <div className='flex items-center gap-x-1'>

          <input type="checkbox"
          defaultChecked={allowedNumber}
          id='numberinput'
          onChange={()=>{
            setAllowedNumber((prev)=> !prev)

          }}
                    
          />
          <label htmlFor="numberInput">Number</label>


          </div>
          <div className='flex items-center gap-x-1'>

<input type="checkbox"
defaultChecked={allowedChar}
id='charinput'
onChange={()=>{
  setAllowedChar((prev)=> !prev)

}}
          
/>
<label htmlFor="charInput">Character</label>


</div>

          
        </div>
      </div>
    </div>
  )
}
