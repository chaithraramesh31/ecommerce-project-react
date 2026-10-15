import { it, expect, describe } from 'vitest';
import { formatCurrency } from './money';

describe('formotCurrency', () => {
  it('formats 1999 cents as $19.99', () => {
    expect(formatCurrency(1999)).toBe('$19.99');
  });

  it('displays 2 decimals', () => {
    expect(formatCurrency(1090)).toBe('$10.90');
    expect(formatCurrency(100)).toBe('$1.00');
  });
})
