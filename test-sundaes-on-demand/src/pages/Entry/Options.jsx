import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => {
        // console.log('Options > get scoops error', error);
        
        setError(true);
      })
  }, [optionType]);

  if (error) {
    return <AlertBanner />
  }

  const OptionItem = optionType === 'scoops' ? ScoopOption : ToppingOption;

  // console.log('Options > items', items);

  return (
    <Row>
      {items.map(({ name, imagePath }) => (
        <OptionItem key={name} name={name} imagePath={imagePath} />
      ))}
    </Row>
  )
}

export default Options
