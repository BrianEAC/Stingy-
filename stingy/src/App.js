import React, { useEffect, useState } from "react";
import movServices from './services/movements'
import "./App.css";

const SubmitForm = ({
  moneyNumber,
  moneyChange,
  typeName,
  typeChange,
  submit,
  handleChange,
  checked,
  thisClass,
}) => {
  return (
    <div className="formButton">
      <form onSubmit={submit} className={thisClass}>
        <div className="radio">
          <input
            type="radio"
            id="radio-one"
            name="switch-one"
            onChange={handleChange}
            checked={checked}
          />
          <label htmlFor="radio-one">Income</label>
          <input
            type="radio"
            id="radio-two"
            name="switch-one"
            onChange={handleChange}
            checked={!checked}
          />
          <label htmlFor="radio-two">Expense </label>
        </div>
        <div>
          Amount: $
          <input
            value={moneyNumber}
            onChange={moneyChange}
            type="number"
            id="currency-input"
            min="1"
            step="any"
            required
          />
        </div>
        <div>
          Description: <input value={typeName} onChange={typeChange} required />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const Movements = ({ movements, className, handleDelete }) => {
  return movements.map((mov) => (
    <ul className={className}>
      <h3>{mov.description}</h3> <li>${mov.value} </li>
      <li>{mov.type}</li>
      <button onClick={()=>handleDelete(mov._id)}>delete</button>
    </ul>
  ));
};

const Total = ({ incomes, expenses }) => {
  return (
    <div>
      <ul className="total">
        <li>Incomes: ${incomes}</li>
        <li>Expenses: ${expenses}</li>
        <li>Total: ${incomes - expenses}</li>
      </ul>
    </div>
  );
};

function App() {
  const [movements, setMovements] = useState([]);
  const [incomes, setIncome] = useState([]);
  const [expenses, setExpense] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [money, setMoney] = useState("");
  const [isChecked, setChecked] = useState(true); 
  useEffect(() => {
    movServices
      .getAll()
      .then(res => setMovements(res.data)
      )
    }, [movements])
    
  

  const handleType = (e) => {
    setExpenseName(e.target.value);
  };

  const handleMoney = (e) => {
    setMoney(Number(e.target.value));
  };

  const addNew = (e) => {
    e.preventDefault();
    if (isChecked) {
      const incomeObject = {
        description: expenseName,
        value: Number(money),
        type: "income",
      };
      movServices
        .create(incomeObject)
        .then(res => {  
          setIncome(incomes.concat(res.data));
          setMoney("");
          setExpenseName("");
          setMovements(movements.concat(res.data));
        })
    } else {
      const expenseObject = {
        description: expenseName,
        value: Number(money),
        type: "expense",
      };
      movServices
        .create(expenseObject)
        .then(res => { 
          setExpense(expenses.concat(res.data));
          setMoney("");
          setExpenseName("");
          setMovements(movements.concat(res.data));
        })
     
    }
  };


  const handleChange = (e) => {
    setChecked(!isChecked);
  };

  const eraseMov = (id) => {
    movServices.erase(id)
  }
    

  return (
    
    <div className='d'>
      <div className="header">
        <h1>Stingy!</h1>
      </div>

      <div className="App">
        <h2>Add new movement:</h2>
        <SubmitForm
          typeName={expenseName}
          moneyNumber={money}
          moneyChange={handleMoney}
          checked={isChecked}
          handleChange={handleChange}
          typeChange={handleType}
          submit={addNew}
        />
        <div className="movements">
          <Movements movements={movements} className="movDetail" handleDelete={eraseMov} />
        </div>
        <div>
          <h2>Total movements:</h2>.
          <Total incomes={movements.filter(mov => mov.type === 'income').reduce((a, b) => a + b.value, 0)} expenses={movements.filter(mov => mov.type === 'expense').reduce((a, b) => a + b.value, 0)} />
        </div>
      </div>
    </div>
  );
}

export default App;
