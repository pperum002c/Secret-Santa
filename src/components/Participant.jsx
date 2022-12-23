import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Participant = ( {onAdd} ) => {

  const [name, setName] = useState('');
  const [eid, setEid] = useState('');
  const [wish, setWish] = useState('');
  const [stay, setStay] = useState('');
  const [pickup, setPickup] = useState(false);
  const [amsanta, setAmsanta]= useState(false)

  const toast = useRef(null);
  
  const accept = () => {
    toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'Sending your wish to Santa', life: 6000 });

    onAdd({name, eid, wish, stay, pickup, amsanta})

    setName('');
    setEid('');
    setWish('');
    setStay('');
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Failed, Make another wish', life: 6000 });
    setName('');
    setEid('');
    setWish('');
    setStay('');
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!name || !eid || !wish || !stay){
      alert('Nead all details to make your wish true.')
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
    <div className='input-fields'>
      <Toast ref={toast} />
      <ConfirmDialog />
      <h2 className='wish-header'>What's your wish ?</h2>
      <InputText type="text" value={name} className="block mb-2" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
      <InputText type="text" value={eid} className="block mb-2" placeholder="Employee ID" onChange={(e) => setEid(e.target.value)}/>
      <div id="textarea-1">
        <InputTextarea value={wish} onChange={(e) => setWish(e.target.value)} placeholder='Wishlist (Price Range Max 1000)'/>
        <p id="help-text">Provide Comma Seperated Values</p>
      </div>
      <div id="textarea-2">
        <InputTextarea value={stay} onChange={(e) => setStay(e.target.value)} rows={5} cols={30} placeholder='Present Address'/>
        <p id="help-text">Current Stay Address</p>
      </div>
      {/* <Button label="Submit" className="p-button-rounded p-button-success" id="btn-submit" onClick={handleClick}/> */}
      <Button onClick={handleClick} id="btn-submit" icon="pi pi-check" label="Confirm" className="p-button-rounded p-button-success"></Button>
    </div>
  )
}

export default Participant