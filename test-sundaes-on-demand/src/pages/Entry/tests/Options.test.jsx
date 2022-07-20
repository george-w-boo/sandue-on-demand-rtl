import { render, screen } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

describe('Options', () => {
  test('finds scoop images', async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    const scoopImgs = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImgs).toHaveLength(4);

    const altTexts = scoopImgs.map(img => img.alt);
    expect(altTexts).toEqual(["Mint chip scoop", "Vanilla scoop", "Chocolate scoop", "Salted caramel scoop"])
  });

  test('finds topping images', async () => {
    render(<Options optionType='toppings' />, { wrapper: OrderDetailsProvider });

    const toppingIms = await screen.findAllByRole('img', { name: /topping/i });
    expect(toppingIms).toHaveLength(2);

    const imgTexts = toppingIms.map(img => img.alt);
    expect(imgTexts).toEqual(['M&Ms topping', 'Hot fudge topping'])
  })
})
