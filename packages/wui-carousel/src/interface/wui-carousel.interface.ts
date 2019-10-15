export interface ListItem {
    type: string
    src: string,
    altText: string,
    thumbnail ?: ImageInterface
}

export interface ImageInterface {
    src: string,
    altText: string   
}