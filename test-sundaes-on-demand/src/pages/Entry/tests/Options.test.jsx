import { render, screen } from '@testing-library/react';
import Options from '../Options';

describe('Options', () => {
  test('finds images', async () => {
    render(<Options optionType="scoops" />);

    const scoopImgs = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImgs).toHaveLength(4);

    const altTexts = scoopImgs.map(img => img.alt);
    expect(altTexts).toEqual(["Mint chip scoop", "Vanilla scoop", "Chocolate scoop", "Salted caramel scoop"])
  })
})
