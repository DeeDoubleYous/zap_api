export const makeDatePath = (): string => {
    const date = new Date(Date.now());
    return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
};

export const makeProperName = (originalName: string): string =>{
    return originalName.replace(/\s/g, '');
}