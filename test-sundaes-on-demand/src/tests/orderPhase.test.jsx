import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('order phases for happy path', async () => {
    // render app
    render(<Router><App /></Router>)

    // add ice cream scoops and toppings
    const vanillaSelect = await screen.findByRole('spinbutton', { name: /Vanilla/i});
    const hotFudge = await screen.findByRole('checkbox', { name: /Hot fudge/i })


    userEvent.clear(vanillaSelect);
    userEvent.type(vanillaSelect, '1');
    userEvent.click(hotFudge)

    // check summary info based on order
    const goToSummary = screen.getByRole('button', { name: /Go to summary/i})

    userEvent.click(goToSummary);

    const grandTotal = screen.getByText('Total: $', { exact: false })
    expect(grandTotal).toHaveTextContent('3.50');

    // accept terms and conds and click button confirm order
    const termsAndConds = screen.getByRole('checkbox', { name: /Terms and Conditions/i})

    userEvent.click(termsAndConds);

    const confirmOrderBtn = screen.getByRole('button', { name: /confirm order/i});
    expect(confirmOrderBtn).toBeEnabled();

    userEvent.click(confirmOrderBtn);

    // check if loading is present
    const loading = screen.getByText('Loading', { exact: false });
    expect(loading).toBeInTheDocument();

    // confirm order number on confirmation page
    const orderNumber = await screen.findByText('Your order number is', { exact: false });
    const notLoading = screen.queryByText(/loading/i);
  
    expect(orderNumber).toHaveTextContent('7672789825');
    expect(notLoading).not.toBeInTheDocument();

    // click 'new order' button on confirmation page
    const newOrderBtn = screen.getByRole('button', { name: /new order/i })
    userEvent.click(newOrderBtn);

    // check that scoops and toppings subtotals have been reset
    const scoopsTotal = screen.getByText('Scoops total: $', { exact: false});
    expect(scoopsTotal).toHaveTextContent('0.00');

    const toppingsTotal = screen.getByText('Toppings total: $', { exact: false});
    expect(toppingsTotal).toHaveTextContent('0.00');
  })
})
