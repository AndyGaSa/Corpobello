/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useRouter } from 'next/router';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

jest.mock('next/router');
useRouter.mockReturnValue({ pathname: '/' });
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByText('/corpobello/i');

    expect(heading).toBeInTheDocument();
  });
});
