import { render, screen } from '../../test-utils/testing-library-utils';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { Confirmation } from './Confirmation';

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Confirmation', () => {
  test('error response from server for submititng order', async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    )

    render(<Confirmation />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(
      'An unexpected error ocurred. Please, try again later...'
    )
  });
})
