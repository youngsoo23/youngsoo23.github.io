/** 'YYYY.MM' 형식. end를 생략하면 재직 중으로 보고 빌드 시점의 달까지 계산한다. */
export interface Span {
  start: string;
  end?: string;
}

function toMonthIndex(yearMonth: string): number {
  const match = /^(\d{4})\.(0[1-9]|1[0-2])$/.exec(yearMonth);
  if (!match) throw new Error(`잘못된 연월 형식입니다: "${yearMonth}" (YYYY.MM)`);
  return Number(match[1]) * 12 + Number(match[2]) - 1;
}

function monthRange({ start, end }: Span): [number, number] {
  const now = new Date();
  const from = toMonthIndex(start);
  const to = end ? toMonthIndex(end) : now.getFullYear() * 12 + now.getMonth();
  if (to < from) throw new Error(`종료월이 시작월보다 빠릅니다: ${start} – ${end}`);
  return [from, to];
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years}년`, rest && `${rest}개월`].filter(Boolean).join(' ');
}

export function formatPeriod({ start, end }: Span): string {
  return `${start} – ${end ?? '현재'}`;
}

/** 시작월과 종료월을 모두 포함한 개월 수 */
export function spanMonths(span: Span): number {
  const [from, to] = monthRange(span);
  return to - from + 1;
}

/** 겹치는 달은 한 번만 센 총 경력 개월 수 */
export function totalMonths(spans: Span[]): number {
  const months = new Set<number>();
  for (const span of spans) {
    const [from, to] = monthRange(span);
    for (let month = from; month <= to; month++) months.add(month);
  }
  return months.size;
}
