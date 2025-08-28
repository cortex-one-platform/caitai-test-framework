import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TestUtils, TestProviders } from '../index.js';

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(
      <TestProviders>
        <ComponentName />
      </TestProviders>
    );
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(
      <TestProviders>
        <ComponentName />
      </TestProviders>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Updated Text')).toBeInTheDocument();
    });
  });

  it('should handle form submissions securely', async () => {
    render(
      <TestProviders>
        <ComponentName />
      </TestProviders>
    );
    
    const form = screen.getByRole('form');
    const input = screen.getByLabelText('Email');
    
    // Test XSS prevention
    fireEvent.change(input, { target: { value: '<script>alert("xss")</script>' } });
    expect(input.value).not.toContain('<script>');
    
    // Test form submission
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
    });
  });
});
