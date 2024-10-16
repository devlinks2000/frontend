import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../components/link/header';

describe('Header', () => {
  it('renders the header title', () => {
    render(<Header />);
    expect(screen.getByText(/customize your links/i)).toBeInTheDocument();
  });

  it('renders the header description', () => {
    render(<Header />);
    expect(screen.getByText(/add\/edit\/remove links below/i)).toBeInTheDocument();
  });
});
