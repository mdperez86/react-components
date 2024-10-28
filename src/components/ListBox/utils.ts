export function getOptionId(
  parentId: string,
  value: string,
  id?: string,
): string {
  if (id) return id;

  return `${parentId}${normalizeValue(value)}`;
}

function normalizeValue(value: string): string {
  return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
