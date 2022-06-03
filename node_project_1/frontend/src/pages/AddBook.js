import React, {useState} from 'react'
import "../assets/sass/form.scss"
import api from "../api/config.js";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddBook = () => {

  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState({}); 
  
  const handleChange = (e) =>{
      console.log(e.target.value);
      setFormData({...formData,[e.target.name]: e.target.value});
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("/book/add",{
            ...formData,
            image: imageData
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        );
        if(response.data.id){
            console.log(response);
            toast.success(response.data.message);
            e.target.reset();
            setFormData({});
            setImageData();
    
        }else{
            console.log(response.data.message); 
            toast.error(response.data.message);
        }
    }catch(err){
        toast.error(err.data.message);
    }
    
  };

  return (
    <div style={{
        justifyContent: "center", 
        display:"flex", 
        padding: "20px", 
        }}
        onSubmit={addBook}
    >
        <ToastContainer/>
        <form style={{display:"flex", flexDirection: "column", justifyContent:"center" }}>
        Name
            <input type="text" name="name" onChange={handleChange} />
        Author  
            <input type="text" name="author" onChange={handleChange} />
        Genre  
            <input type="text" name="genre" onChange={handleChange} />
        Description  
            <textarea name="description" rows="10" onChange={handleChange}></textarea>  
            <input type="file" name="image" onChange={(e)=> setImageData(e.target.files[0])} />
            <input type="submit" value="submit"/>
        </form>
    </div>
  )
}

export default AddBook