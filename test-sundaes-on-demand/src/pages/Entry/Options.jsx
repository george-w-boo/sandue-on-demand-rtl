import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../consts'
import { useOrderDetails } from '../../contexts/OrderDetails';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => setError(true))
  }, [optionType]);

  if (error) {
    return <AlertBanner />
  }

  const OptionItem = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  // console.log('Options > items', items);

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>{title} total: {orderDetails.totals[optionType]}</p>
      <Row>
        {items.map(({ name, imagePath }) => (
          <OptionItem
            key={name}
            name={name}
            imagePath={imagePath}
            updateItemCount={(itemName, itemCount) => updateItemCount(itemName, itemCount, optionType)}
          />
        ))}
      </Row>
    </>
  )
}

export default Options
