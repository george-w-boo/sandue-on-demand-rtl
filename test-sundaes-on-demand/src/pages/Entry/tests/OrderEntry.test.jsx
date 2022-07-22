import { screen, waitFor, render } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

  // pay attention to write it at the top level of your file
  const mockedUsedNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));

describe('OrderEntry', () => {
  test('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    );

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');

      expect(alerts).toHaveLength(2);
    })
  })
});
