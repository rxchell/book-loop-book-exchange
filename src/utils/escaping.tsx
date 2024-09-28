export const unescapeEmail = (str: string) => {
    return str.replace(/\s+/g, '.');
};

export const escapeEmail = (str: string) => {
    return str.replace(/\./g, ' ')
}

