import { useEffect, useRef, useState } from "react"
export let activeTabLineRef;
export let activeTabRef;
import { useContext } from "react";
import { ThemeContext } from "../App";

const InPageNavigaion = ({routes,defaultHidden = [], defaultActiveIndex = 0, children}) => {
    activeTabLineRef = useRef()
    activeTabRef = useRef()

    const { theme } = useContext(ThemeContext)

    let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex)

    let [isResizeEventAdded, setIsResizeEventAdded] = useState(false)

    let [width, setWidth] = useState(window.innerWidth)
    const changePageState = (btn, i) =>{
        let {offsetWidth, offsetLeft} = btn;
        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";
        setInPageNavIndex(i)
    }
    useEffect(() =>{

        if(width > 766 && inPageNavIndex != defaultActiveIndex) 
            changePageState(activeTabRef.current, defaultActiveIndex)

        if(!isResizeEventAdded){
            window.addEventListener('resize', ()=> {
                if(!isResizeEventAdded){
                    setIsResizeEventAdded(true)
                }

                setWidth(window.innerWidth)
            })
        }
    }, [width])
    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex)
    },[])
  return (
    <>
        <div className={`relative mb-8 bg-white border-b ${theme === 'dark' ? 'border-darkGrey'  : 'border-lightGrey'} flex flex-nowrap overflow-x-auto`}>
            {
                routes && routes.map((route, i) =>{
                    return <button
                        ref={i === defaultActiveIndex ? activeTabRef : null}
                        onClick={(e) => {changePageState(e.target, i)}}
                        key={i}
                        className={"p-4 px-5 capitalize " + ( inPageNavIndex === i ? "text-black " : "text-dark-grey ") + (defaultHidden.includes(route) ? " md:hidden ": " ")}
                    >{route}
                    </button>
                })
            }
            <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300 border-gray-300"/>
        </div>
        {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  )
}

export default InPageNavigaion