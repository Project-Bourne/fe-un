import { TabModel } from "@/models/ui/components.models";
import Image from "next/image";
import { useEffect, useState } from "react";



function Tab({ tabHeaderContents, tabBodyContents, tabIndex }:TabModel) {
    const [ toggleIndex, setToggleIndex ] = useState<number>(0)
    // sets tab when clicked and also stores selected index to localStorage for global access 
    const handleTabClick = (index) => {
        setToggleIndex(index)
        localStorage.setItem('tabIndex', index);
    }
// persist tabIndex number accross anywhere component where Tab is rendered 
    useEffect(() => {
        const i = JSON.parse(localStorage.getItem('tabIndex'));
        setToggleIndex(i);
    }, [])



    return(
        <>
        {   /* tab headers  */}
            <div className="w-full pt-3 border-b-[1px] border-b-gray-100">
                <ul className="w-full md:w-[80%] flex flex-wrap md:flex-nowrap gap-x-1 md:gap-x-3">
                    {tabHeaderContents.map(content => (
                        <li 
                        onClick={() => handleTabClick(content.id)}
                        className={`flex px-3 md:px-8 pb-2 pt-1 font-light text-xs hover:text-sirp-primary hover:border-b-2 hover:border-b-sirp-primary active:text-sirp-primary transition ease-in-out ${toggleIndex === content.id ? 'text-sirp-primary border-b-2 border-b-sirp-primary' : 'text-gray-800'}`}
                        >
                            {content?.icon && 
                            <Image
                                src={content?.icon}
                                alt={content.title}
                                height={13}
                                width={13}
                                className="bg-gray-800 hover:bg-sirp-primary active:bg-sirp-primary"
                                />
                            }
                            <label>{content.title}</label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* tab body  */}
           { tabBodyContents &&
                <div>
                {tabBodyContents.map((content) => (
                    <>
                        {toggleIndex === content.id && content.component}
                    </>
                ))}
                </div>
            }
        </>
    )
}

export default Tab