import React, {  useRef , useState } from 'react'
import './ImageGenerator.css'
import default_image from '../assets/default_image.svg'
const ImageGenerator = () => {

const [image_url , setImage_url] = useState("/");
let inputRef = useRef(null);
const [loading , setLoading] = useState(false);

const imageGenerator = async() => {
  if(inputRef.current.value ===" "){return 0;}
  setLoading(true);
  const response =await fetch("https://api.openai.com/v1/images/generations" ,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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",
      "User-Agent":"Chrome",
        },
    body: JSON.stringify({
      prompt:`${ inputRef.current.value}`,
     n:1,
     size:"512x512",
    }),
  } );
  let data = await response.json();
  console.log(data);
  let data_array = data.data;
  setImage_url(data_array[0].url);
  setLoading(false);

}
  return (
    <div className='aiig'>
      <div className='header'> Imaginify with <span>kairvee</span></div>
      <div className="img-loading">
        <div className="image"><img src= {image_url==="/"?default_image:image_url} alt=" " /></div>
        <div className="loading">
          <div className={loading? "loading-bar-full":"loading-bar"}></div>
          <div className={loading?"loading-text":"dispay-none"}>Ruko jara , sabar karo...</div>
        </div>
      </div>
      <div className="search-box">
        <input type='text' ref = {inputRef} className='search-input' placeholder='Describe what you want to seee' />
        <div className="btn" onClick={() =>{imageGenerator()}}>Generate</div>
      </div>

    </div>
  )
}

export default ImageGenerator

//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