export const makeProperName = (originalName: string): string =>{
    return `${new Date(Date.now()).valueOf()}_${originalName.replace(/\s/g, '')}`;
}