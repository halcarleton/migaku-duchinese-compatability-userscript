export function separateCharacterTypes(content: string) {
  const half = Math.floor(content.length / 2);
  const simplified = content.substring(0, half).trim();
  const traditional = content.substring(half + 1).trim();

  return { simplified, traditional };
}
