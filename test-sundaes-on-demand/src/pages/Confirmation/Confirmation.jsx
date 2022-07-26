import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Button } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';

export const Confirmation = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [value, , resetOrder] = useOrderDetails();
  let navigate = useNavigate();

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

  if (error) return <AlertBanner />

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
      <Button
        variant='primary'
        type='button'
        onClick={() => {
          navigate('/');
          resetOrder();
        }}
      >
        New order
      </Button>
    </>
  )
}
