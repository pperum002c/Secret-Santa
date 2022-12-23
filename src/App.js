import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyButton from './components/MyButton'
import Participant from './components/Participant';
import Wishlist from './components/Wishlist';
import React from 'react';
import Playgame from './components/Playgame';

function App() {
  const [wishes, setWishes] = useState([])

  useEffect(() => {
    const fetchwishes = async()=>{
      const res = await fetch('http://localhost:5000/wishes')
      const data = await res.json()

      setWishes(data)
    }
    fetchwishes()
  }, [])

  const addWish = async (wish) =>{
    const oldnames = wishes.map(x => x.name)
    const curname = wish.name

    const oldempids = wishes.map(y => y.eid)
    const curid = wish.eid

    const nameres = oldnames.findIndex(eacholdname => curname.toLowerCase() === eacholdname.toLowerCase())

    const empres = oldempids.findIndex(eacholdid => curid.toLowerCase() === eacholdid.toLowerCase())

    if ((nameres !== -1) || (empres !== -1)){
      alert('Ho Ho Ho...Your wish is my list, wait for the surprise')
      return
    }

    const resp = await fetch('http://localhost:5000/wishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wish)
    })

    const data = await resp.json()
    setWishes([...wishes, data])
    // const ids = wishes.map(x => x.id)
    // const id = Math.max.apply(null, ids) + 1
    
    // const new_wish = {id, ...wish}
    // console.log(new_wish)
    // setWishes([...wishes, new_wish])
  }

  return (
    <Router>
        <div className="App">
          <MyButton />
          <Routes>
            <Route path='/makeawish' exact element={<Participant onAdd={addWish}/>}/>
            <Route path='/beasanta' exact element={<Playgame/>}/>
            <Route path='/wishes' exact element={<Wishlist wishes={wishes}/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
