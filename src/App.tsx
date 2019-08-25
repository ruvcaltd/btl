import React, { useReducer, useState } from 'react';
import './App.css';
import appReducer from './AppReducer';
import AppState from './AppState';
import { Actions } from './Actions';
import {AddressProvider, WhereClause} from './AppServices';
import Address from './Models/Address';
import { generateId } from './Utils/Uuid';

const initialState: AppState = new AppState();

const save = (name:string, favFood:string) => {
  const address:Address = {AddressLine1:"Chestnut Grove", AddressLine2:"", DoorNumber:"40", PostCode:"DA2 7PG", ID: generateId()};
  AddressProvider.create(address, "address")
  .then(r=>{
    console.log('successfully saved '+ address.ID);
    AddressProvider.get(address.ID, "address")
      .then(d=>{

        console.log(d.data());

        console.log('updating now');
        address.DoorNumber = "41";
        AddressProvider.update(address,"address")
          .then(u=>{
            console.log('updated');
          });

      })
  });

  AddressProvider.query("address", new WhereClause("PostCode", "==", "DA2 7PG"))
  .onSnapshot(r=>{
    console.log('snapshot '+ r.docs.length);    
  });  

}

const App: React.FC = () => {
  const [state, dispatch] = useReducer<any>(appReducer, initialState); 

  const[name, setName] = useState("");
  const[favFood, setFavFood] = useState("");

  return (
    <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Fun Food Friends</h1>              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={e=>{e.preventDefault(); save(name, favFood);}}>
                <input type="text" name="username" placeholder="What's your name?" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="text" name="currentItem" placeholder="What are you bringing?"  value={favFood} onChange={(e)=>setFavFood(e.target.value)}/>
                <button onClick={()=>{ dispatch({type:Actions.FavFoodAdded, payload:{Name: name, FavFood: favFood}}) }}>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
  );
}

export default App;
