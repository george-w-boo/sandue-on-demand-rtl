import SummaryForm from "../SummaryForm";
import { render, screen, fireEvent } from '@testing-library/react';

describe('SummaryForm', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
  const button = screen.getByRole('button', {name: /confirm order/i});

  test('checkbox functionality', () => {
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  })
})
