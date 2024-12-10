import React, { useState, useEffect, useContext } from 'react'
import TitleAndDescription from '../components/TitleAndDescription'
import { axiosInstance } from "../axios";
import "./Accessibility.css"
import { ColorContext } from '../ColorContext';
import { FontContext } from '../FontContext';

const Accessibility = (props) => {
    const { updateColor } = useContext(ColorContext);
    const { updateFont } = useContext(FontContext);

    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [options, setOptions] = useState(["Light", "Dark"])

    const changeColor = (event) => {
        axiosInstance.post(`/color-mode`,
            { color: event.target.value },
        )
            .then(response => {
                setColor(response.data)
                updateColor(response.data.toLowerCase())
                const newOptions = (response.data === "Light") ? ["Dark"] : ["Light"];
                setOptions(newOptions)
            })
            .catch(err => {
                console.log('Failed to change color mode')
                console.log(err)
            })
    }

    useEffect(() => {
        axiosInstance.get(`/color-mode`)
            .then(response => {
                setColor(response.data)
                updateColor(response.data.toLowerCase())
                const newOptions = (response.data === "Light") ? ["Dark"] : ["Light"];
                setOptions(newOptions)
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/font-size`)
            .then(response => {
                setSize(response.data)
                updateFont(response.data)
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })
    }, [])

    const adjustFontSize = (evt) => {
        // adjust font size based on slider position
        evt.preventDefault();
        const font = parseFloat(evt.target.value);

        axiosInstance.post(`/font-size`,
            { fontSize: font },
        )
            .then(response => {
                setSize(response.data)
                updateFont(response.data)
            })
            .catch(err => {
                console.log('Failed to change font size')
                console.log(err)
            })

    }

    return (
        < div className="w-[100%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[80%] lg:w-[60%]" >
            <TitleAndDescription
                title={props.text}
                description={"Manage your color mode and font settings."}
            />

            <div className="w-[90%] mx-auto gap-4 bg-lavender_blush-900 p-2 rounded-md">
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Display color mode</p>

                    <div className="flex justify-center overflow-hidden px-4 py-2 bg-lavender_blush-900 border-[1px] border-rose rounded-md text-rose font-bold">
                        <select className="bg-transparent" value={color} name={"color-mode"} onChange={changeColor}>
                            <option>{color}</option>
                            {options.map(x => (
                                <option key={options.indexOf(x)} className="px-4 py-2" value={x}>{x}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Font Size</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className={"text-ebony font-thin mb-5 w-[70%] px-" + size}>This is your current font size. Adjusting the font will only affect posts on the home page.</p>
                    <input className="w-[80%] mb-5" type="range" default="16" value={size} step="2" min="10" max="18" onChange={adjustFontSize}></input>
                </div>
            </div>
        </div >
    )
}

export default Accessibility