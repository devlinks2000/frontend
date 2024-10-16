import React from 'react';
import { render, screen } from '@testing-library/react';
import GetStartedComponent from '../../../components/link/getStarted';

describe('GetStartedComponent', () => {
  it('renders the get started message', () => {
    render(<GetStartedComponent />);
    expect(screen.getByText(/let’s get you started/i)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<GetStartedComponent />);
    expect(screen.getByText(/use the “add new link” button to get started/i)).toBeInTheDocument();
  });
});
