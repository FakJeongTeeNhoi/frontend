export function formatOpeningDay(days: string[]): string {
    const abbreviations = days.map(day => day.substring(0, 3).toUpperCase());

    const grouped: string[] = [];
    for (let i = 0; i < abbreviations.length; i++) {
        const start = i;

        while (i + 1 < abbreviations.length && 
               (abbreviations[i + 1] !== abbreviations[i])) {
            i++;
        }

        if (start < i) {
            grouped.push(`${abbreviations[start]} - ${abbreviations[i]}`);
        } else {
            grouped.push(abbreviations[start]);
        }
    }

    return grouped.join(', ');
}
