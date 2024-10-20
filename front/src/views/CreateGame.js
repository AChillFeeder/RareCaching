import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateGame.css';
import IndiceInput from './components/IndiceInput'
import IndicesList from './components/IndicesList';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapOptions } from './configurations/MapConfiguration';
import Map from './components/MapCreate';
import slide_image1 from "../assets/champions/champion1.jpeg";

const CreateGame = () => {

  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader ({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey
  })

  const [listTodo,setListTodo]=useState([]);

  let addList = (inputText)=>{
    if(inputText!=='')
      setListTodo([...listTodo,inputText]);
  }
  
  const deleteListItem = (key)=>{
    let newListTodo = [...listTodo];
    newListTodo.splice(key,1)
    setListTodo([...newListTodo])
  }

  const handleBtnClick = () => {
    navigate('/Dashboard');
  };


  return (
    <div className='main-container'>
      <div className="center-container">
        <h1 className="title">Créer une cache</h1>
        <img src={slide_image1}/>
        <IndiceInput addList={addList}/>
        {listTodo.map((listItem,i) => {
          return (
            <IndicesList key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
          )
        })}
        <div className='map-container'>
          <Map isLoaded={isLoaded}/>
        </div>

        <button 
          className='btn-create'
          onClick={handleBtnClick}
        >Créer cache</button>
        
          
      </div>
    </div>
  );
}

export default CreateGame;