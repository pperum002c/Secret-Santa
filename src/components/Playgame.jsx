import React, { useState,useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Playgame = () => {

  const [eid, setEid] = useState('');
  const [wishes, setWishes] = useState('');
 
  useEffect(() => {
    const getwishes = async() => {
      const wishfromserver = await fetchwishes()
      setWishes(wishfromserver)
    }
    getwishes()
  }, [])
  
  const fetchwishes = async()=>{
    const res = await fetch('http://localhost:5000/wishes')
    const data = await res.json()
    return data
  }

  const toast = useRef(null);


  const fetchwish = async(id)=>{
    const res = await fetch(`http://localhost:5000/wishes/${id}`)
    const data = await res.json()
    return data
  }
  

  const accept = async () => {
    const fetch_santa_from_json = wishes.filter(ew => (ew.eid === eid))

    if (fetch_santa_from_json.length === 0){
      toast.current.show({ severity: 'warn', summary: 'Not Available', detail: 'No Santa Available in this ID', life: 6000 });
      return
    }

    console.log(fetch_santa_from_json[0].amsanta)
    console.log(fetch_santa_from_json[0].name)

    if (fetch_santa_from_json[0].amsanta){
      toast.current.show({ severity: 'warn', summary: 'No No No', detail: 'Santa Job Already Assigned', life: 6000 });
      return
    }


    const remaining = wishes.filter(eachwish => (eachwish.eid !== eid && eachwish.pickup === false))
    
    if (remaining.length === 0) {
      toast.current.show({ severity: 'warn', summary: 'Not Available', detail: 'No More Santa Jobs Available', life: 6000 });
      return
    }
    else {
      const random_from_remaining = remaining[Math.floor(Math.random()*remaining.length)];
      console.log(random_from_remaining.name)

      // GET ID FROM RANDOM FROM REMAINING 
      const update_pickup = await fetchwish(random_from_remaining.id)


      const updPickup = { ...update_pickup, pickup: !update_pickup.pickup}
      

      const res = await fetch(`http://localhost:5000/wishes/${random_from_remaining.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updPickup)
      })

      console.log(res)

      const santa_data = await fetchwish(fetch_santa_from_json[0].id)
      
      const updSanta = { ...santa_data, amsanta: !santa_data.amsanta}

      const resp = await fetch(`http://localhost:5000/wishes/${fetch_santa_from_json[0].id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updSanta)
      })

      console.log(resp)

      const wishfromserver = await fetchwishes()
      setWishes(wishfromserver)

      toast.current.show({ severity: 'success', summary: 'Confirmed', detail: `Confirmed, Send Gifts to ${random_from_remaining.name}`, life: 6000 });

      const texts = [`${random_from_remaining.name}\n`, `${random_from_remaining.eid}\n`, `${random_from_remaining.wish}\n`, `${random_from_remaining.stay}\n`]

      const file = new Blob(texts, {type: 'text/plain'})
      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = "Your_Slot_Pick.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }

  } 

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Failed, Retry Again Santa', life: 6000 });
    setEid('');
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!eid ){
      alert('Nead all your details Santa.')
      return
    }
  
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept,
      reject
    });
    
  }

  return (
    <div className='be-a-santa'>
      <Toast ref={toast} />
      <ConfirmDialog />
      <h2 className='wish-header'>Welcome Santa</h2>
      <InputText type="text" value={eid} className="block mb-2" placeholder="Employee ID" onChange={(e) => setEid(e.target.value)}/>
      <Button label="Submit" className="p-button-rounded p-button-success" id="btn-submit" onClick={handleClick}/>
    </div>
  )
}

export default Playgame