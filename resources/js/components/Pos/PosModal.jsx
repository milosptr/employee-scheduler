import React, { useState } from 'react'
import axios from 'axios'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EnterPin } from './EnterPin'
import { TransactionsTab } from './TransactionsTab'
import { InvoicesTab } from './InvoicesTab'

export const PosModal = ({ onClose }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('racuni')
  const [invoices, setInvoices] = useState([])
  const [transactions, setTransactions] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    Promise.all([
      axios.get('/api/pos/invoices'),
      axios.get('/api/pos/transactions'),
    ])
      .then(([invoicesRes, transactionsRes]) => {
        setInvoices(invoicesRes.data.data || invoicesRes.data)
        setTransactions(transactionsRes.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Greska pri ucitavanju podataka iz POS sistema.')
        setLoading(false)
      })
  }

  const handlePinSuccess = () => {
    setAuthenticated(true)
    fetchData()
  }

  const handleClose = () => {
    setAuthenticated(false)
    onClose()
  }

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice)
  }

  const handleAction = () => {
    const selectedId = selectedInvoice?.id
    setError(null)
    Promise.all([
      axios.get('/api/pos/invoices'),
      axios.get('/api/pos/transactions'),
    ])
      .then(([invoicesRes, transactionsRes]) => {
        const freshInvoices = invoicesRes.data.data || invoicesRes.data
        setInvoices(freshInvoices)
        setTransactions(transactionsRes.data)
        if (selectedId) {
          setSelectedInvoice(freshInvoices.find((i) => i.id === selectedId) || null)
        }
      })
      .catch(() => {
        setError('Greska pri ucitavanju podataka iz POS sistema.')
      })
  }

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={handleClose}></div>
      <div className='relative z-[101] bg-white rounded-lg shadow-xl flex flex-col w-[90%] ModalHeight'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div className='text-xl font-semibold'>
          {authenticated ? 'POS' : 'Unesite PIN'}
        </div>
        <XMarkIcon
          className='w-8 h-8 cursor-pointer hover:text-gray-500'
          onClick={handleClose}
        />
      </div>

      {!authenticated && (
        <div className='flex-1'>
          <EnterPin onSuccess={handlePinSuccess} />
        </div>
      )}

      {authenticated && (
        <>
          <div className='flex border-b'>
            <button
              className={`px-6 py-3 font-semibold text-sm ${activeTab === 'promet' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('promet')}
            >
              Promet
            </button>
            <button
              className={`px-6 py-3 font-semibold text-sm ${activeTab === 'racuni' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('racuni')}
            >
              Racuni
            </button>
          </div>

          <div className='flex-1 overflow-hidden'>
            {loading && (
              <div className='flex items-center justify-center h-full'>
                <div className='text-gray-400 text-lg'>Ucitavanje...</div>
              </div>
            )}

            {error && (
              <div className='flex items-center justify-center h-full'>
                <div className='text-red-500 text-lg'>{error}</div>
              </div>
            )}

            {!loading && !error && activeTab === 'promet' && transactions && (
              <TransactionsTab transactions={transactions} />
            )}

            {!loading && !error && activeTab === 'racuni' && (
              <InvoicesTab
                invoices={invoices}
                selectedInvoice={selectedInvoice}
                onSelect={handleSelectInvoice}
                onAction={handleAction}
              />
            )}
          </div>
        </>
      )}
      </div>
    </div>
  )
}
