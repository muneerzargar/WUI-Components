export type ListItem = {
    type: string
    src: string,
    altText: string,
    thumbnail ?: ImageInterface
}

export type ImageInterface = {
    src: string,
    altText: string   
}