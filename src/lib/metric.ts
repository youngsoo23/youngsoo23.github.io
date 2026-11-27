interface MetricInput {
  value?: string | number | null;
  label?: string | null;
}

function filled(input: string | number | null | undefined): string {
  const text = String(input ?? '').trim();
  return text.toUpperCase() === 'TODO' ? '' : text;
}

/** 값이 비어 있거나 TODO이면 null을 돌려주어 지표 영역이 렌더링되지 않게 한다. */
export function getMetric(metric?: MetricInput) {
  const value = filled(metric?.value);
  return value ? { value, label: filled(metric?.label) } : null;
}
