export {};

declare global {
  interface Window {
    __launchStars?: (fromRect: DOMRect, count?: number) => void;
  }
}
