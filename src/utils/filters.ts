export function dateFormate(value: string): string {
  const date = new Date(value).toString().slice(4, 15)
  return date
}
export default { dateFormate }
