
const getBlogImgPath = (imgPath: string) => {
    //const fullPath = "uploads/images/image/1751952985632-blog2.jpg";
    return imgPath.slice(7);
}

export default getBlogImgPath;