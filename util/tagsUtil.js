function tagParse(tags) {
    return tags.replace(" ", "").replace(/，/g, ",")
}
module.exports.tagParse = tagParse