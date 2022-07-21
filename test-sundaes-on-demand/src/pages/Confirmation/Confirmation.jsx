import axios from 'axios';
import { useState, useEffect } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';

export const Confirmation = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [value] = useOrderDetails();

  console.log('orderNumber', orderNumber);
  useEffect(() => {
    const controller = new AbortController();

    setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      await axios
      .post('http://localhost:3030/order', value, {
        signal: controller.signal
      })
      .then(response => {
        setOrderNumber(response.data.orderNumber)
        setIsLoading(false);
      })
      .catch(error => setError(JSON.stringify(error)))
    })
    return () => controller.abort()
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Thank you</h1>
          <p>Your order number is {error ? error : orderNumber}</p>
          <p>as per our terms and conditions, nothing will happen now</p>
        </>
      )}
    </>
  )
}
