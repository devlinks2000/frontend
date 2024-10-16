import React from 'react';
import { render } from '@testing-library/react';
import LoadingView from '../../components/loadingView';

describe('LoadingView', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(<LoadingView />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });
});
