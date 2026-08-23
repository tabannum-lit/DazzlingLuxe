// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { webcrypto } from 'crypto';
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  (global as any).TextEncoder = NodeTextEncoder;
  (global as any).TextDecoder = NodeTextDecoder;
}
if (typeof (global as any).crypto === 'undefined' || typeof (global as any).crypto.subtle === 'undefined') {
  (global as any).crypto = webcrypto;
}

// jsdom has no URL.createObjectURL/revokeObjectURL. Plain functions (not
// jest.fn()) — this project's jest config sets resetMocks: true, which wipes
// any jest.fn() implementation configured outside a beforeEach before every
// test runs, silently turning it back into a no-op returning undefined.
if (typeof URL.createObjectURL === 'undefined') {
  (URL as any).createObjectURL = () => 'blob:mock-url';
  (URL as any).revokeObjectURL = () => {};
}
