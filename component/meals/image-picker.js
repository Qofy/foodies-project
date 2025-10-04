"use client";
import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
  const fileInputRef = useRef();
  function pickImageHandler() {
    fileInputRef.current.click();
  }
  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
      <input type="file" id="image" name={name} accept="image/png, image/jpeg" className={classes.input}/>
      </div>
      <button className={classes.button} type='button' onClick={pickImageHandler}>Upload Image</button>
    </div>
  );
}