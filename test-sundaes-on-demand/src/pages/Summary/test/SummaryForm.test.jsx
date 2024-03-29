import SummaryForm from "../SummaryForm";
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SummaryForm', () => {
  test('checkbox functionality', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
    const button = screen.getByRole('button', {name: /confirm order/i});

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  })

  test('popover responds to hover', async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);

    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when mouse out
    userEvent.unhover(termsAndConditions);

    await waitForElementToBeRemoved(() => 
      screen.queryByText(/no ice cream will actually be delivered/i)
    )
    // const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i);
    // expect(nullPopoverAgain).not.toBeInTheDocument();
  })
})
