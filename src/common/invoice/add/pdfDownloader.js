// CompleteModalContent.js

import React from 'react'
import AddCardHeader from '../invoiceComponents/addCard/AddCardHeader'
import AddCardInvoiceTo from '../invoiceComponents/addCard/AddCardInvoiceTo'
import AddCardItemSelect from '../invoiceComponents/addCard/AddCardItemSelect'
import AddCardItemWithTotal from '../invoiceComponents/addCard/AddCardItemWithTotal'

const ContentDownloader = ({ data, itemTotalData, onClose }) => {
  return (
    <div>
      <AddCardHeader />
      {data.map((invoiceData, index) => (
        <React.Fragment key={index}>
          <AddCardInvoiceTo clientData={invoiceData.by} amount={invoiceData.amount} />
          <AddCardItemSelect visaBookingIds={invoiceData.visaBookingIds} />
          {index < data.length - 1 && <hr />}
        </React.Fragment>
      ))}
      <AddCardItemWithTotal data={itemTotalData} />
      <div id='action-buttons' style={{ textAlign: 'center', marginTop: '10px' }}>
        {/* Include the buttons here */}
        <button onClick={onClose}>Close</button>
        <button onClick={() => window.print()}>Print</button>
        <button onClick={pdfDownloader}>PDF</button>
        <button onClick={screenShotHandler}>Screenshot</button>
      </div>
    </div>
  )
}

export default ContentDownloader
