import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import List from './components/List'
import Alert from './components/Alert'
import './App.css';
import uuid from 'uuid/v4'


const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : []

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses]);

  const handleCharge = (event) => {
    setCharge(event.target.value);
  }

  const handleAmount = (event) => {
    setAmount(event.target.value);
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 2500)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(charge !== '' && amount > 0){
      if(edit){
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? {...item, charge, amount} :item
        });
        setExpenses(tempExpenses);
        handleAlert({type: 'success', text: 'item edited'});
        setEdit(false);
      } else {
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense]); 
        handleAlert({type: 'success', text: 'item added!!'});
      }
      
      setCharge('');
      setAmount('');
    } else {
      handleAlert({type: 'danger', text: 'charge cannot be empty and amount has to be bigger than 0'});
    }
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: 'success', text: 'all items deleted!'});
  }

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: 'success', text: 'item deleted!'});
  }

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    
  }

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>budget calculator</h1>
      <main className="App">
        <Form charge={charge} 
        amount={amount} 
        handleAmount={handleAmount} 
        handleCharge={handleCharge} 
        handleSubmit={handleSubmit}
        edit={edit}/>
        <List expenses={expenses} 
        clearItems={clearItems} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit}/>
      </main>
      <h1>total spending : <span className="total">${expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount));
      },0)}</span></h1>
      
      
    </div>
  );
}

export default App;
