import { render, screen } from '@testing-library/react';
import Options from '../Options';

describe('Options', () => {
  test('finds images', () => {
    render(<Options />);

    const scoopImgs = screen.getAllByRole('img', { name: /scoop/i});
    expect(scoopImgs).toHaveLength(4);

    const altTexts = scoopImgs.map(img => img.alt);
    expect(allTexts).toEqual(["Mint chip", "Vanilla", "Chocolate", "Salted caramel"])
  })
})
