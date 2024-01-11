import React from 'react'
import { useState, useEffect } from 'react';

export default function Themes({...props}) {

    const [theme, setTheme] = useState('black');

    useEffect(() => {
        document.documentElement.setAttribute('color-scheme', localStorage.getItem('theme') ?? 'default')
         props.envelopeColorChange()
      }, [props.envelopeColorChange, theme])

    const themeChange = (e) => {
        const button = e.target;
        switch (true) {
            default: return null;
            case button.classList.contains('theme_1'): {
                setTheme('default');
                localStorage.setItem('theme', 'default')
                break
            }
    
            case button.classList.contains('theme_2'): {
                setTheme('purple');     
                localStorage.setItem('theme', 'purple')
                break
            }
    
            case button.classList.contains('theme_3'): {
                setTheme('red');
                localStorage.setItem('theme', 'red')
                break
            }
    
            case button.classList.contains('theme_4'): {
                setTheme('blue');
                localStorage.setItem('theme', 'blue')
                break
            }
        }
    }

    function handleShowText() {
        localStorage.setItem('text', !props.showText)
        return props.setShowText(!props.showText)
      }

  return (
    <div className='themes'>
        <button onClick={themeChange} className="theme_selector theme_1"></button>
        <button onClick={themeChange} className="theme_selector theme_2"></button>
        <button onClick={themeChange} className="theme_selector theme_3"></button>
        <button onClick={themeChange} className="theme_selector theme_4"></button>
        <button onClick={handleShowText} className="theme_selector toggle_text">T</button>
    </div>
  )
}
