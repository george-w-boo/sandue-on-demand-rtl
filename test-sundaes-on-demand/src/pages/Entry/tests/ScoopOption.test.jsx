import { render, screen} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

describe('ScoopOption', () => {
  test('checks select validation', () => {
    render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

    const vanillaSelect = screen.getByRole('spinbutton');

    userEvent.clear(vanillaSelect);
    userEvent.type(vanillaSelect, '-1');

    expect(vanillaSelect).toHaveClass('is-invalid');

    userEvent.clear(vanillaSelect);
    userEvent.type(vanillaSelect, '1.5');

    expect(vanillaSelect).toHaveClass('is-invalid');

    userEvent.clear(vanillaSelect);
    userEvent.type(vanillaSelect, '11');

    expect(vanillaSelect).toHaveClass('is-invalid');

    userEvent.clear(vanillaSelect);
    userEvent.type(vanillaSelect, '5');

    expect(vanillaSelect).not.toHaveClass('is-invalid');
  })
})
