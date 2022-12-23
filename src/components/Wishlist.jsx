import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Wishlist = ( {wishes} ) => {
  return (
    <div className='input-fields-table' style={{ height: 'calc(90vh - 145px)' }}>
        <h2 className='wish-header'>All your wishes will come true</h2>
        <DataTable value={wishes} scrollable scrollHeight="flex" id='wish-table'>
            <Column field="eid" header="Emp ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="wish" header="Your Wish"></Column>
            <Column field="stay" header="Current Address"></Column>
        </DataTable>
</div>
  )
}

export default Wishlist