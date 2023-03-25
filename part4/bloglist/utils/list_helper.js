const _ = require('lodash')
const dummyData = require('../tests/MOCK_DATA')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((t,c)=>{
        return t+c.likes;
    },0);
    return result
}

const favoriteBlog = (blogs) =>{
    let max = 0;
    let obj = {}
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].likes>max){
            max = blogs[i].likes;
            obj = blogs[i]
        }
    }
    return obj;
}

const mostBlogs = (blogs) =>{
    if(blogs.count==0){return {}}
    const authorCount = _.countBy(blogs,"author");
    const objectKeys = Object.keys(authorCount)
    const topAuthor = objectKeys.reduce((s,c)=>{
        return authorCount[s]>authorCount[c]?s:c;
    },objectKeys[0])
    return{
        author:topAuthor,
        blogs:authorCount[topAuthor]
    }
}

console.log(mostBlogs(dummyData))

//console.log(totalLikes([{likes:4},{likes:2}]))
module.exports = {dummy,totalLikes,favoriteBlog,mostBlogs}