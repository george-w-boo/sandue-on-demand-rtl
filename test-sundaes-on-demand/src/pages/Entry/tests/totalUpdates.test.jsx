import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

  // pay attention to write it at the top level of your file
  const mockedUsedNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));

describe('totalUpdates', () => {
  test('initial scoops total, +1 scoop, +another scoop', async () => {
    render(<Options optionType="scoops" />);

    const scoopsTotal = screen.getByText('Scoops total: $', { exact: false});
    expect(scoopsTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsTotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate'});
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsTotal).toHaveTextContent('6.00');
  });

  test('initial toppings total, add topping, remove topping', async () => {
    render(<Options optionType="toppings" />);

    const toppingsTotal = screen.getByText('Toppings total: $', { exact: false});
    expect(toppingsTotal).toHaveTextContent('0.00');

    const mnmCheckbox = await screen.findByRole('checkbox', { name: /M&Ms/i});
    userEvent.click(mnmCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');

    const hotfudgeCheckbox = await screen.findByRole('checkbox', { name: /Hot fudge/i});
    userEvent.click(hotfudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('3.00');

    userEvent.click(hotfudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');
  })
})

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotalH2 = screen.getByRole('heading', { name: /grand total: \$/i});

    // checks initial state of grand total h2
    expect(grandTotalH2).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'});

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotalH2).toHaveTextContent('2.00');
  })
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotalH2 = screen.getByRole('heading', { name: /grand total: \$/i});

    const mnmCheckbox = await screen.findByRole('checkbox', { name: /M&Ms/i});
    
    userEvent.click(mnmCheckbox);
    expect(grandTotalH2).toHaveTextContent('1.50');

    userEvent.click(mnmCheckbox);
    expect(grandTotalH2).toHaveTextContent('0.00');
  })
})
