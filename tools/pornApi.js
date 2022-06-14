const pornhub = require("@justalk/pornhub-api")

function searchPage(url) {
    // Returns the full information about the video in the page link
    const fields = ["title", "description", "views", "percent", "pornstars", "duration", "number_of_comment", "thumbnail_url", "related_videos"]

    const video = new Promise( async (resolve, reject) => {
        const dict =  await pornhub.page(url, fields) // {"example": "text here"}
        if(Object.keys(dict).length != 0) resolve(dict)
        else reject()
    })
    return video
}

function searchVideos(keyword) {
    // Returns all of the videos that are related to the keyword
    const filters = {
        search: "video",
        page: 1,
    }
    const fields = ["related_search", "related_pornstars"]

    const videos = new Promise( async (resolve, reject) => {
        const dict =  await pornhub.search(keyword, fields, filters) // { "results": [{"link": "http"}] }
        if(Object.keys(dict).length != 0) resolve(dict)
        else reject()
    })
    return videos
}

module.exports.searchVideos = searchVideos
module.exports.searchPage = searchPage
