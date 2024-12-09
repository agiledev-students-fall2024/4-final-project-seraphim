import { axiosInstance } from "../axios";
import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'

const Community = () => {
    //stores the data from database into data 
    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    const [reversedData, setReversedData] = useState([])
    const [originalData, setOriginalData] = useState([])

    const handleSearch = (e) => {
        setInput(e.target.value);

        //checks for empty searches
        if (input === undefined || input === '') {
            setData(originalData);
            return
        }
        if (input.trim() === '') {
            setData(originalData);
            return
        }

        //filters data based on search term
        const newData = data.filter(item => {
            console.log(item.name.toLowerCase())
            return item.name.toLowerCase().includes(input.toLowerCase())
        })

        setReversedData(newData);
    }

    useEffect(() => {
        console.log("Currently getting community groups' data...")

        //getting data from back-end 
        axiosInstance
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/community`)
            .then(response => {
                setData(response.data)
                setOriginalData(response.data)

                const reversedData = [...response.data].reverse()
                setReversedData(reversedData)

            })
            .catch(err => {
                console.log("Unable to retrieve community data.")
                console.error(err)
            })

    }, [])

    console.log(data)

    return (
        <>
            <div className="w-[100%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[90%]">
                <h1 className="text-xl text-ebony-700 text-center font-bold">Communities</h1>
                <SearchBar searchInput={input} setSearchInput={setInput} handleSearch={handleSearch} />

                <section className="flex flex-col justify-center w-[100%] gap-0">
                    {reversedData.map(item => (
                        <div key={item.id} className="groups">
                            <TitleAndDescriptionBox
                                link={`/community/${item.id}`}
                                title={item.name}
                                description={item.description}
                            />
                        </div>

                    ))}
                </section>

                <div className="padding"></div>
            </div>

        </>
    )
}

export default Community