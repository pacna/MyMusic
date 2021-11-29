// react
import { render, screen } from '@testing-library/react';

// components
import { App } from './App';

test('renders learn react link', () => {
  // ARRANGE
  render(<App />);

  // ASSERT
  expect(screen).not.toBeNull();
});
