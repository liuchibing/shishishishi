import 六十四卦 from '$lib/六十四卦.json';

export function is阳(n: number): boolean {
    switch (n) {
        case 6:
            return false;
        case 7:
            return true;
        case 8:
            return false;
        case 9:
            return true;
        default:
            throw new Error('Invalid value'); // should never happen
    }
}

export function to卦in阴阳(卦: number[]): boolean[] {
    return 卦.map((n) => is阳(n));
}

export function lookup卦Name(卦: boolean[]): string {
    if (卦.length === 3) {
        return (
            六十四卦.八卦.find((item) => item.pattern.every((it, index) => it === 卦[index]))?.name ||
            '未知'
        );
    } else if (卦.length === 6) {
        return (
            六十四卦.六十四卦.find((item) => item.pattern.every((it, index) => it === 卦[index]))
                ?.name || '未知'
        );
    } else {
        return '';
    }
}