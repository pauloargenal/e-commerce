import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Card } from '../../src/components/card';

describe('Card Component', () => {
  const cardContent = 'Test Content';
  it('should render with children', () => {
    render(<Card>{cardContent}</Card>);
    expect(screen.getByText(cardContent)).toBeTruthy();
  });

  it('should apply medium padding by default', () => {
    const { container } = render(<Card>{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('p-4');
  });

  it('should apply no padding when specified', () => {
    const { container } = render(<Card padding="none">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('p-');
  });

  it('should apply small padding when specified', () => {
    const { container } = render(<Card padding="sm">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('p-3');
  });

  it('should apply large padding when specified', () => {
    const { container } = render(<Card padding="lg">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('p-6');
  });

  it('should apply medium shadow by default', () => {
    const { container } = render(<Card>{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('shadow-md');
  });

  it('should apply no shadow when specified', () => {
    const { container } = render(<Card shadow="none">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('shadow-');
  });

  it('should apply small shadow when specified', () => {
    const { container } = render(<Card shadow="sm">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('shadow-sm');
  });

  it('should apply large shadow when specified', () => {
    const { container } = render(<Card shadow="lg">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('shadow-lg');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-class">{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });

  it('should have rounded corners', () => {
    const { container } = render(<Card>{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('rounded-lg');
  });

  it('should have white background', () => {
    const { container } = render(<Card>{cardContent}</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('bg-white');
  });
});
