export const getFirstNWords = (title: string, length: number): string => {
    return title.split(' ').splice(0, length).join(" ");
}