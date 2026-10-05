import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

export const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const ImageGenerator = async () =>{
        if (inputRef.current.value ===""){
            return 0;
        }
        const response = await fetch("https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer YOUR_REAL_KEY",
                 
                 },
                 body: JSON.stringify({
                    model: "gpt-image-1",
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "1024x1024",
                 }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        console.log(data);
    }

  return (
    <div className='ai-image-generator'>
        <div className='header'>AI image <span>Generator</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url=== "/"?default_image:image_url}  /></div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
            <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}
