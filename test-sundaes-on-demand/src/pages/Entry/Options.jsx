import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`).then(response => setItems(response.data)).catch(error => {
      // TODO: handle error
      console.log('Options > get scoops error', error);
    })
  }, [optionType]);

  const OptionItem = optionType === 'scoops' ? ScoopOption : null;

  console.log('Options > items', items);

  return (
    <Row>
      {items.map(({ name, imagePath }) => (
        <OptionItem key={name} name={name} imagePath={imagePath} />
      ))}
    </Row>
  )
}

export default Options
