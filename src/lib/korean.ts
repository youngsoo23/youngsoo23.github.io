/** 받침에 따라 '로' 또는 '으로'를 붙인다. (받침이 없거나 ㄹ 받침이면 '로') */
export function withRo(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const isHangul = code >= 0 && code <= 11171;
  const final = isHangul ? code % 28 : 0;
  return `${word}${final === 0 || final === 8 ? '로' : '으로'}`;
}
