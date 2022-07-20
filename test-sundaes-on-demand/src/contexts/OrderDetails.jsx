import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../consts';

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be within OrderDetailsProvider');
  }

  return context;
}

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  })

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal
    })
  }, [optionCounts])

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = {...optionCounts};

      const optionCountMap = newOptionCounts[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }
  
  const resetOrder = () => {
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    })
  }

    return [{...optionCounts, totals}, updateItemCount, resetOrder ]
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />
}