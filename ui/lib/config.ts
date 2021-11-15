/* eslint-disable no-underscore-dangle */
const __DEV__ = process.env.NODE_ENV !== 'production';

/** Determines if devnet should be used (instead of mainnet) */
const __DEVNET__ = false;

export const API_URL = __DEV__ ? 'http://localhost:4000' : 'https://demo.mypass.id';

export const IOTA_NODE_URL = __DEVNET__ ? 'https://nodes.devnet.iota.org' : 'https://nodes.iota.cafe:443';

export const RANDOM_USER_DATA_API_URL = 'https://randomuser.me/api/';

export const SPLASH_SCREEN_TIMEOUT = 2000;

export const VERSION = '0.2.0';
