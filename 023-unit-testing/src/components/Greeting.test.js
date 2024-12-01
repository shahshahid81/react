import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Greeting from './Greeting';

describe('Greeting component', () => {
  // test and expect are globally available
  test('renders Hello World as a text', () => {
    // Arrange
    // This will render the whole component tree
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World!');
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see" you if the button was NOT clicked', () => {
    render(<Greeting />);

    const goodToSeeYouText = screen.getByText("It's good to see you!");
    expect(goodToSeeYouText).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    render(<Greeting />);

    // getByRole will throw error if we have more than one button
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const goodToSeeYouText = screen.getByText("Changed!");
    expect(goodToSeeYouText).toBeInTheDocument();

  });

  test('does not render "good to see you" if the button was clicked', () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const goodToSeeYouText = screen.queryByText("It's good to see you!");
    expect(goodToSeeYouText).toBeNull();

  });
});
