import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from '../../src/components/button';

describe('Button component', () => {
  const buttonText = 'Click me';
  it('should render with children', () => {
    render(<Button>{buttonText}</Button>);
    expect(screen.getByRole('button', { name: buttonText })).toBeTruthy();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>{buttonText}</Button>);

    fireEvent.click(screen.getByRole('button', { name: buttonText }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary variant styles by default', () => {
    render(<Button>{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('bg-blue-80');
    expect(button.className).toContain('text-white');
  });

  it('should apply secondary variant styles', () => {
    render(<Button variant="secondary">{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('bg-gray-600');
  });

  it('should apply danger variant styles', () => {
    render(<Button variant="danger">{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('bg-red-600');
  });

  it('should apply outline variant styles', () => {
    render(<Button variant="outline">{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('bg-transparent');
  });

  it('should apply small size styles', () => {
    render(<Button size="sm">{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('px-3');
    expect(button.className).toContain('py-1.5');
  });

  it('should apply medium size styles by default', () => {
    render(<Button>{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('px-4');
    expect(button.className).toContain('py-2');
  });

  it('should apply large size styles', () => {
    render(<Button size="lg">{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('px-6');
    expect(button.className).toContain('py-3');
  });

  it('should apply full width styles when specified', () => {
    render(<Button fullWidth>{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button.className).toContain('w-full');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        {buttonText}
      </Button>
    );

    fireEvent.click(screen.getByRole('button', { name: buttonText }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
