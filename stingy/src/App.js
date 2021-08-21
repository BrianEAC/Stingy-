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
}) => {
  return (
    <div>
      <form onSubmit={submit}>
        <div>
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
          $
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
          Description:{" "}
          <input value={typeName} onChange={typeChange} required/>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const Movements = ({ movementType, className }) => {
  return movementType.map((mov) => (
    <div className={className}>
      description: {mov.description}$:{mov.value} type: {mov.type}
    </div>
  ));
};

const Total = ({ incomes, expenses }) => {
  return (
    <>
      <ul>
        <li>Incomes: {incomes}</li>
        <li>Expenses: {expenses}</li>
        <li>Total: {incomes - expenses}</li>
      </ul>
    </>
  );
};

function App() {
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
    } else {
      const expenseObject = {
        description: expenseName,
        value: money,
        type: "expense",
      };
      setExpense(expenses.concat(expenseObject));
      setMoney("");
      setExpenseName("");
    }
  };

  const getIncomes = incomes.reduce((a, b) => a + b.value, 0);

  const getExpenses = expenses.reduce((a, b) => a + b.value, 0);

  const handleChange = (e) => {
    setChecked(!isChecked);
  };

  return (
    <div className="App">
      <h1>Stingy!</h1>
      <h2>Total movements:</h2>
      <Total incomes={getIncomes} expenses={getExpenses} />
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
      <Movements movementType={expenses} className='expenses' />
      <Movements movementType={incomes} className='incomes' />
      </div>
    </div>
  );
}

export default App;
