export interface Summary {
  summarise: { indices: any, valid: boolean};
  keyword: { words: Array<string>, valid: boolean};
  acronyms: object;
  lastSent: string;
}

// TODO: remove the 'summarised' field

export const DEFAULT_SUMMARY = {
  summarise: { indices: [], valid: true },
  keyword: { words: [], valid: true },
  lastSent: '',
  acronyms: []
};
