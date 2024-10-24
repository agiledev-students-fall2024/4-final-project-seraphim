import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// blog post component
const BlogPost = ({User}) => {

    const [user, setUser] = useState({})

    // set the user as soon as this is loaded
    useEffect(() => {
        setUser(User)
    }, [])

    return
    (<div>
        <img src={user.profilePic}></img>  
        <div>
            <p><span>{user.name}</span>{user.userName}</p>
            <div>{user.text}</div>
            {user.images &&
                user.images.map(images => (
                    <img src={images}></img>
                ))
            }
        </div>  
    </div>)
}

// export blog post
export default BlogPost