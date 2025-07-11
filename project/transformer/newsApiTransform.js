//here we transform our news api so that instead of storing just name inside database we store the full url 

import { getImageUrl } from "../utils/helper.js";

class NewsApiTransform{
    static transform(news){
        return {
            id : news.id,
            heading: news.title,
            news : news.content,
            image : getImageUrl(news.image) ,
            created_at : news.created_at
        }
    }
}

export default NewsApiTransform