import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

describe('totalUpdates', () => {
  test('initial scoops subtotal, +1 scoop, +another scoop', async () => {
    render(<Options optionType="scoops" />);

    const subTotal = screen.getByText('Scoops subtotal:', { exact: false});
    expect(subTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(subTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate'});
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(subTotal).toHaveTextContent('6.00');
  })
})