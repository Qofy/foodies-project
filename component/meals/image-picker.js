"use client";
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState();
  function pickImageHandler() {
    fileInputRef.current.click();
  }

  function pickedHandler(event) {
    const files = event.target.files[0];
    if(!files){
      setSelectedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedImage(fileReader.result);
    }
    fileReader.readAsDataURL(files);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!selectedImage && <p>No image picked yet.</p>}
          {selectedImage && <Image src={selectedImage} alt="Picked Image" fill/>}
        </div>
      <input 
      type="file" 
      id={name} 
      name={name} 
      accept="image/png, image/jpeg" 
      className={classes.input} 
      ref={fileInputRef}
      onChange={pickedHandler}/>
      </div>
      <button className={classes.button} type='button' onClick={pickImageHandler}>Upload Image</button>
    </div>
  );
}