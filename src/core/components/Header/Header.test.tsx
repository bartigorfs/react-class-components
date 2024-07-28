import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from '@components/Header/Header.tsx'

vi.mock('./Header.module.css', () => ({
  __esModule: true,
  default: {
    header: 'mocked-header-class',
  }
}));

describe('Header component', () => {
  it('renders the header component', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link', { name: /@bartigorfs/i });
    expect(linkElement).toBeInTheDocument();
  });

  it('has the correct href attribute', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link', { name: /@bartigorfs/i });
    expect(linkElement).toHaveAttribute('href', 'https://github.com/bartigorfs');
  });

  it('opens the link in a new tab', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link', { name: /@bartigorfs/i });
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('has the correct className', () => {
    render(<Header />);
    const divElement = screen.getByText(/@bartigorfs/i).closest('div');
    expect(divElement).toHaveClass('mocked-header-class');
  });
});
