import { useEffect, useState } from 'react';
import './App.css';
import { config } from './config';


function App() {


  const [items, setItems] = useState(config.data)
  const [grandTotal, setGrandTotal] = useState(0)


  const handleInputChange = (e, index) => {
    let arr = [...items]
    console.log(e.target.value);
    arr[index].qty = e.target.value
    arr[index].sum = Number(e.target.value) * arr[index].price
    setItems(arr)
  }

  const handleMinus = (index) => {
    let arr = [...items]
    arr[index].qty -= 1
    if (Number(arr[index].qty) <= 0) {
      arr[index].qty = 0 
    }
    arr[index].sum = Number(arr[index].qty) * arr[index].price
    setItems(arr)
  }

  const handlePlus = (index) => {
    let arr = [...items]
    arr[index].qty += 1
    arr[index].sum = Number(arr[index].qty) * arr[index].price
    setItems(arr)
  }


  useEffect(() => {
    let sum = 0
    items.forEach((item) => {
      sum += item.sum
    })
    setGrandTotal(sum)
  }, [items])


  return (
    <div className="App">
      <h1>ALDA Pay</h1>

      <table>
        <thead>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </thead>
        <tbody>
          {items.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={()=>handleMinus(index)}> -</button>
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={item.qty}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <button onClick={()=>handlePlus(index)}> +</button>

              </td>
              <td>{item.sum}</td>
            </tr>
          )}

        </tbody>
      </table>
      <div>
        Grand Total  = {grandTotal}
      </div>
      <a href={`upi://pay?pa=${config.upiId}&pn=${config.name}&cu=INR&am=${grandTotal}`} >Pay Now !</a>

    </div>
  );
}

export default App;
