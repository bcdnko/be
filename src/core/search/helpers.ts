export function mapToSearchLanguage(bibleLanguage: string): string {
  const map: Record<string, string> = {
    en: 'english',
    ru: 'russian',
  };

  return map[bibleLanguage];
}
