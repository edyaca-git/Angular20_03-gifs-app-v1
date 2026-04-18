import { Gif } from "../interfaces/gif.interface";
import { GiphiItem } from "../interfaces/giphy.interfaces";


export class GifMapper{

    static mapGiphyItemToGif( giphyItem: GiphiItem ): Gif {
        return {
            id: giphyItem.id,
            title: giphyItem.title,
            url: giphyItem.images.original.url
        }
    }

    static mapGiphyItemsToGifArray(giphyItems: GiphiItem[]): Gif[] {
        return giphyItems.map(this.mapGiphyItemToGif);
    }


}