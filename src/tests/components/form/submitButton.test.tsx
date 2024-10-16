import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from '../../../components/form/submitButton';

describe('SubmitButton', () => {
  it('renders with the correct text', () => {
    render(<SubmitButton text="Submit" />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<SubmitButton text="Submit" disabled={true} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('is enabled when the disabled prop is false', () => {
    render(<SubmitButton text="Submit" disabled={false} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
  });
});
