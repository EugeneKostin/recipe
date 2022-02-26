export const removeSpaces = (value) => {
    const regex = /\s+/g;
    return value.replace(regex, ' ').trim()
}