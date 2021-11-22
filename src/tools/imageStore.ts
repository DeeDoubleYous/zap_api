import { UploadedFile } from 'express-fileupload';

const makeDatePath = (): string => {
    const date = new Date(Date.now());
    return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
};

const makeProperName = (originalName: string): string =>{
    return originalName.replace(/\s/g, '');
}


/**
 * Takes an image upload and stores it to the server local disk while returning the path to return to it to be saved in the database.
 * If Passed multiple files will only take the first.
 * @param img
 * @returns The url to find the stored image
 */
export const uploadImage = async (img: UploadedFile | UploadedFile[]): Promise<string> => {
    let url = '';
    let fImg: UploadedFile;
    if('mv' in img){
        fImg = img;
    }else{
        fImg = img[0];
    }
    url = `./public/images/${makeDatePath()}/${makeProperName(fImg.name)}`;
    await fImg.mv(url);
    return url;
}

/**
 * Updates the image at the url on the server with the given image
 * @param img 
 * @param originalUrl 
 */
export const updateImage = async (img: UploadedFile | UploadedFile[], originalUrl: string): Promise<void> => {
    let fImg: UploadedFile;
    if('mv' in img){
        fImg = img;
    }else{
        fImg = img[0];
    }
    await fImg.mv(originalUrl);
}