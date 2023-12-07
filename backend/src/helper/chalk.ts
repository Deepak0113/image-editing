// ANSI escape codes for color
const greenColor = '\x1b[32m';
const resetColor = '\x1b[0m';

export const console_success = (content: string) => {
    console.log(greenColor + content + resetColor)
}