import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/link/footer';

describe('Footer', () => {
  it('renders the save button', () => {
    render(<Footer loading={false} />);
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('disables the save button when loading', () => {
    render(<Footer loading={true} />);
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
  });
});
