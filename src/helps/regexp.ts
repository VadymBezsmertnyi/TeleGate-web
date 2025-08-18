export const REGEX_FORMAT = /[() -]/g;

export const getClearValue = (value: string): string =>
  value.replaceAll(REGEX_FORMAT, "");
