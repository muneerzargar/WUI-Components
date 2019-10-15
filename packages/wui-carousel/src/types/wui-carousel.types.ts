export interface ListItem {
    type: string
    src: string,
    altText: string,
    thumbnail ?: Thumbnail
}

export interface Thumbnail {
    src: string,
    altText: string   
}

export interface SelectedItem {
    detail: {
        selectedIndex: number
    }
}