const listHelper = require('../utils/list_helper')
const dummyData = require('./MOCK_DATA')


test('dummy returns 1',()=>{
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes',()=>{
    test('of an empty list is zero',()=>{
        const blogs = [];
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    });

    test('when list has only one blogs equals likes of that',()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }]
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(5);
    })

    test('when list has multiple blogs',()=>{
        const result = listHelper.totalLikes(dummyData)
        expect(result).toBe(510)
    })
})

describe('favorite blog',()=>{
    test('of an empty list is {}',()=>{
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({})
    })
    test('when list has only one object',()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }]
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[0])
    })

    test('when list has multiple objects',()=>{
        const result = listHelper.favoriteBlog(dummyData)
        expect(result).toEqual({"_id":"01GW1MD0QQF4XRV2GMX8KWZYFJ","title":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.","author":"bkillgus4","url":"http://dummyimage.com/131x100.png/ff4444/ffffff","likes":87})
    })
})

describe("author with most blogs",()=>{
    test("when blogs is empty",()=>{
        const blog = []
        const result = listHelper.mostBlogs(blog)
        expect(result).toEqual({})
    })
    test("when blog contains only one blog",()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }]
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: 'Edsger W. Dijkstra',blogs:1})
    })
    test("when blog contain multiple blogs",()=>{
        const result = listHelper.mostBlogs(dummyData)
        expect(result).toEqual({"author":"lfarncombe0",blogs:1})
        })
})

describe("author with most likes",()=>{
    test("when blogs is empty",()=>{
        const blog = []
        const result = listHelper.mostLikes(blog)
        expect(result).toEqual({})
    })
    test("when blog contains only one blog",()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }]
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({"author":'Edsger W. Dijkstra',likes:5})
    })
    test("when blog contains multiple blogs",()=>{
        const result = listHelper.mostLikes(dummyData)
        expect(result).toEqual({"author":"bkillgus4",likes:87})
    })
})