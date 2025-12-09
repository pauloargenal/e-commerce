import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Select } from '../../src/components/select';

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  it('should render with placeholder', () => {
    render(<Select options={mockOptions} placeholder="Choose an option" />);
    expect(screen.getByText('Choose an option')).toBeTruthy();
  });

  it('should render with default placeholder', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByText('Select an option')).toBeTruthy();
  });

  it('should render with label', () => {
    render(<Select options={mockOptions} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('should open dropdown when clicked', () => {
    render(<Select options={mockOptions} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeTruthy();
    });
  });

  it('should close dropdown when option is selected', async () => {
    render(<Select options={mockOptions} />);
    const button = screen.getByRole('button');

    // open dropdown
    fireEvent.click(button);

    // select an option
    const option = screen.getAllByRole('button').find((btn) => btn.textContent === 'Option 2');
    fireEvent.click(option!);

    // dropdown should close
    await waitFor(() => {
      expect(screen.queryByText('Option 3')).toBeFalsy();
    });
  });

  it('should call onChange when option is selected', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);

    // open dropdown
    fireEvent.click(screen.getByRole('button'));

    // select an option
    const option = screen.getAllByRole('button').find((btn) => btn.textContent === 'Option 2');
    fireEvent.click(option!);

    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('should display selected option', () => {
    render(<Select options={mockOptions} value="option2" />);
    expect(screen.getByText('Option 2')).toBeTruthy();
  });

  it('should update selected value when value prop changes', () => {
    const { rerender } = render(<Select options={mockOptions} value="option1" />);
    expect(screen.getByText('Option 1')).toBeTruthy();

    rerender(<Select options={mockOptions} value="option3" />);
    expect(screen.getByText('Option 3')).toBeTruthy();
  });

  it('should close dropdown when clicking outside', async () => {
    const outsideContent = 'Outside';
    render(
      <>
        <Select options={mockOptions} />
        <div data-testid="outside">{outsideContent}</div>
      </>
    );

    // open dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Option 1')).toBeTruthy();

    // click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));

    await waitFor(() => {
      const options = screen.queryAllByRole('button');
      expect(options.length).toBe(1);
    });
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Select options={mockOptions} disabled />);
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should not open dropdown when disabled', () => {
    render(<Select options={mockOptions} disabled />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    // options should not be visible
    expect(screen.queryByText('Option 1')).toBeFalsy();
  });

  it('should display error message', () => {
    render(<Select options={mockOptions} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('should apply error border styles', () => {
    render(<Select options={mockOptions} error="Error" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-red-500');
  });

  it('should apply full width styles', () => {
    render(<Select options={mockOptions} fullWidth />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('w-full');
  });

  it('should apply custom className', () => {
    render(<Select options={mockOptions} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('should render hidden input with name and value', () => {
    const { container } = render(
      <Select options={mockOptions} name="testSelect" value="option2" />
    );
    const hiddenInput = container.querySelector('input[type="hidden"]') as HTMLInputElement;

    expect(hiddenInput).toBeTruthy();
    expect(hiddenInput.name).toBe('testSelect');
    expect(hiddenInput.value).toBe('option2');
  });

  it('should not render hidden input without name prop', () => {
    const { container } = render(<Select options={mockOptions} value="option2" />);
    const hiddenInput = container.querySelector('input[type="hidden"]');

    expect(hiddenInput).toBeFalsy();
  });

  it('should highlight selected option in dropdown', () => {
    const { container } = render(<Select options={mockOptions} value="option2" />);

    // open dropdown
    fireEvent.click(screen.getByRole('button'));

    // find dropdown container and options within it
    const dropdown = container.querySelector('.absolute.z-50');
    expect(dropdown).toBeTruthy();

    // find all option buttons within the dropdown
    const optionButtons = dropdown!.querySelectorAll('button');
    const selectedButton = Array.from(optionButtons).find((btn) => btn.textContent === 'Option 2');

    expect(selectedButton).toBeTruthy();

    const classNames = selectedButton!.className;
    expect(classNames).toContain('bg-gray-100');
    expect(classNames).toContain('font-medium');
  });

  it('should rotate chevron icon when dropdown is open', () => {
    const { container } = render(<Select options={mockOptions} />);

    let chevron = container.querySelector('.lucide-chevron-down') as SVGElement;
    expect(chevron?.classList.contains('rotate-180')).toBe(false);

    // open dropdown
    fireEvent.click(screen.getByRole('button'));

    chevron = container.querySelector('.lucide-chevron-down') as SVGElement;
    expect(chevron?.classList.contains('rotate-180')).toBe(true);
  });

  it('should show placeholder with different styling when no value selected', () => {
    const { rerender } = render(<Select options={mockOptions} placeholder="Choose..." />);
    const placeholderSpan = screen.getByText('Choose...');
    expect(placeholderSpan.className).toContain('text-gray-400');

    // select a value
    rerender(<Select options={mockOptions} value="option1" placeholder="Choose..." />);
    const valueSpan = screen.getByText('Option 1');
    expect(valueSpan.className).toContain('text-gray-900');
  });

  it('should have proper hover styles on options', () => {
    const { container } = render(<Select options={mockOptions} />);

    // open dropdown
    fireEvent.click(screen.getByRole('button'));

    // find dropdown container and options within it
    const dropdown = container.querySelector('.absolute.z-50');
    const optionButtons = dropdown!.querySelectorAll('button');
    const optionButton = Array.from(optionButtons).find((btn) => btn.textContent === 'Option 1');

    // check if hover class is present in className string
    expect(optionButton).toBeTruthy();
    const classNames = optionButton!.className;
    expect(classNames).toContain('hover:bg-gray-100');
  });

  it('should have proper dropdown positioning styles', () => {
    const { container } = render(<Select options={mockOptions} />);

    // open dropdown
    fireEvent.click(screen.getByRole('button'));

    // find dropdown container
    const dropdown = container.querySelector('.absolute.z-50');
    expect(dropdown).toBeTruthy();
    expect(dropdown?.className).toContain('shadow-lg');
    expect(dropdown?.className).toContain('bg-white');
    expect(dropdown?.className).toContain('rounded-lg');
  });
});
