import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if requests succeeds', async () => {
    // jest is globally available. Overriding with mock function.
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }]
    })

    render(<Async />);

    // getAllByRole will return all the items with the role. This will be sync operation
    // const listItemElements = screen.getAllByRole('listitem');

    // findAllByRole will return all the items with the role after evaluating component a couple of times, Default timeout is 1 second but can be modified.
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
