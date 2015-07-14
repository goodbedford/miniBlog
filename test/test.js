//test sweet

var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://localhost:3000/api/";
var path = require("path");
var fakePost = { title: "Fake Title",
                 body: "Post content, ipsum.Post content, ipsum.Post content, ipsum.Post content, ipsum"
               };

// get all posts
describe("GET /api/posts", function(){
  it("should return statusCode 200", function(done) {
    request.get(baseUrl + "posts", function(error, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

// create post
describe("POST /api/posts", function(){
  it("should return statusCode 201", function(done) {
    request.post(baseUrl + "posts", {form: fakePost}, function(error, res, body){
      console.log("post body");
      console.log(body);
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
});


// get one post by id
describe("GET /api/posts/:id", function(){
  it("should return statusCode 200", function(done) {
    request.get(baseUrl, + "posts/" + res.params.id, function(error, res, body){
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

describe("PUT /api/posts/:id", function(){
  it("should return statusCode 200", function(done) {
    request.put(baseUrl + "posts/" + res.params.id, {form:fakePost}, function(error, res, body){
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});


//delete post by id
describe("POST /api/posts/:id", function(){
  it("should return statusCode 200", function(done){
    request.delete(baseUrl + "posts/" + res.params.id, function(error, res, body){
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});