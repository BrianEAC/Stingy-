import React, { useState } from "react";
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
          <label htmlFor="radio-two">Excome </label>
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

const Movements = ({ movementType, className }) => {
  return movementType.map((mov) => (
    <ul className={className}>
      <h3>{mov.description}</h3> <li>${mov.value} </li>
      <li>{mov.type}</li>
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
  const [isChecked, setChecked] = useState(true); //

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
        value: money,
        type: "income",
      };
      setIncome(incomes.concat(incomeObject));
      setMoney("");
      setExpenseName("");
      setMovements(movements.concat(incomeObject));
    } else {
      const expenseObject = {
        description: expenseName,
        value: money,
        type: "expense",
      };
      setExpense(expenses.concat(expenseObject));
      setMoney("");
      setExpenseName("");
      setMovements(movements.concat(expenseObject));
    }
  };

  const getIncomes = incomes.reduce((a, b) => a + b.value, 0);

  const getExpenses = expenses.reduce((a, b) => a + b.value, 0);

  const handleChange = (e) => {
    setChecked(!isChecked);
  };

    

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
          <Movements movementType={movements} className="movDetail" />
        </div>
        <div>
          <h2>Total movements:</h2>.
          <Total incomes={getIncomes} expenses={getExpenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
