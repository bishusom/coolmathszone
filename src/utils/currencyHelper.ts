// utils/currencyHelper.ts
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  coins: Coin[];
  decimal: boolean;
  subunit: string; // "cents", "pence", "paise", etc.
}

export interface Coin {
  name: string;
  value: number;
  emoji: string;
  displayName: string;
}

export const CURRENCIES: { [key: string]: Currency } = {
  'US': {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    decimal: true,
    subunit: 'cents',
    coins: [
      { name: 'penny', value: 1, emoji: '🪙', displayName: 'penny (1¢)' },
      { name: 'nickel', value: 5, emoji: '🪙', displayName: 'nickel (5¢)' },
      { name: 'dime', value: 10, emoji: '🪙', displayName: 'dime (10¢)' },
      { name: 'quarter', value: 25, emoji: '🪙', displayName: 'quarter (25¢)' }
    ]
  },
  'UK': {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    decimal: true,
    subunit: 'pence',
    coins: [
      { name: '1p', value: 1, emoji: '🪙', displayName: '1p coin' },
      { name: '2p', value: 2, emoji: '🪙', displayName: '2p coin' },
      { name: '5p', value: 5, emoji: '🪙', displayName: '5p coin' },
      { name: '10p', value: 10, emoji: '🪙', displayName: '10p coin' },
      { name: '20p', value: 20, emoji: '🪙', displayName: '20p coin' },
      { name: '50p', value: 50, emoji: '🪙', displayName: '50p coin' },
      { name: '£1', value: 100, emoji: '🪙', displayName: '£1 coin' },
      { name: '£2', value: 200, emoji: '🪙', displayName: '£2 coin' }
    ]
  },
  'IN': {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    decimal: true,
    subunit: 'paise',
    coins: [
      { name: '50p', value: 50, emoji: '🪙', displayName: '50 paise' },
      { name: '₹1', value: 100, emoji: '🪙', displayName: '₹1 coin' },
      { name: '₹2', value: 200, emoji: '🪙', displayName: '₹2 coin' },
      { name: '₹5', value: 500, emoji: '🪙', displayName: '₹5 coin' },
      { name: '₹10', value: 1000, emoji: '🪙', displayName: '₹10 coin' }
    ]
  },
  'AU': {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    decimal: true,
    subunit: 'cents',
    coins: [
      { name: '5c', value: 5, emoji: '🪙', displayName: '5c coin' },
      { name: '10c', value: 10, emoji: '🪙', displayName: '10c coin' },
      { name: '20c', value: 20, emoji: '🪙', displayName: '20c coin' },
      { name: '50c', value: 50, emoji: '🪙', displayName: '50c coin' },
      { name: 'A$1', value: 100, emoji: '🪙', displayName: 'A$1 coin' },
      { name: 'A$2', value: 200, emoji: '🪙', displayName: 'A$2 coin' }
    ]
  },
  'EU': {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    decimal: true,
    subunit: 'cents',
    coins: [
      { name: '1c', value: 1, emoji: '🪙', displayName: '1c coin' },
      { name: '2c', value: 2, emoji: '🪙', displayName: '2c coin' },
      { name: '5c', value: 5, emoji: '🪙', displayName: '5c coin' },
      { name: '10c', value: 10, emoji: '🪙', displayName: '10c coin' },
      { name: '20c', value: 20, emoji: '🪙', displayName: '20c coin' },
      { name: '50c', value: 50, emoji: '🪙', displayName: '50c coin' },
      { name: '€1', value: 100, emoji: '🪙', displayName: '€1 coin' },
      { name: '€2', value: 200, emoji: '🪙', displayName: '€2 coin' }
    ]
  },
  'JP': {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    decimal: false,
    subunit: 'sen',
    coins: [
      { name: '¥1', value: 1, emoji: '🪙', displayName: '¥1 coin' },
      { name: '¥5', value: 5, emoji: '🪙', displayName: '¥5 coin' },
      { name: '¥10', value: 10, emoji: '🪙', displayName: '¥10 coin' },
      { name: '¥50', value: 50, emoji: '🪙', displayName: '¥50 coin' },
      { name: '¥100', value: 100, emoji: '🪙', displayName: '¥100 coin' },
      { name: '¥500', value: 500, emoji: '🪙', displayName: '¥500 coin' }
    ]
  }
};

// Default currency (can be set based on user location/settings)
export const DEFAULT_CURRENCY = 'US';

export function getCurrency(countryCode: string = DEFAULT_CURRENCY): Currency {
  return CURRENCIES[countryCode] || CURRENCIES[DEFAULT_CURRENCY];
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency.decimal) {
    // For decimal currencies, show main unit
    return `${currency.symbol}${(amount / 100).toFixed(2)}`;
  } else {
    // For non-decimal currencies like JPY
    return `${currency.symbol}${amount}`;
  }
}

export function formatSubunit(amount: number, currency: Currency): string {
  if (currency.decimal) {
    return `${amount}${currency.code === 'USD' ? '¢' : currency.subunit.charAt(0)}`;
  } else {
    return `${currency.symbol}${amount}`;
  }
}

export function getCommonCoins(currency: Currency): Coin[] {
  // Return 3-4 most common coins for the currency
  if (currency.code === 'USD') {
    return [currency.coins[0], currency.coins[1], currency.coins[2], currency.coins[3]]; // penny, nickel, dime, quarter
  } else if (currency.code === 'GBP') {
    return [currency.coins[0], currency.coins[2], currency.coins[4], currency.coins[6]]; // 1p, 5p, 20p, £1
  } else if (currency.code === 'INR') {
    return [currency.coins[1], currency.coins[2], currency.coins[3]]; // ₹1, ₹2, ₹5
  } else {
    return currency.coins.slice(0, 4); // First 4 coins for other currencies
  }
}