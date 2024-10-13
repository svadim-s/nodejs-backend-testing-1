import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const createdPost = postsService.create(post);
    expect(createdPost).toBeDefined();
    expect(createdPost.text).toBe(post.text);
    expect(createdPost.id).toBe('2');
    expect(createdPost.date).toBeDefined();

    const foundPost = postsService.find(createdPost.id);
    expect(foundPost).toEqual(createdPost);
  });

  it('should find a post', () => {
    const preExistingPost = postsService.create(post);

    const foundPost = postsService.find(preExistingPost.id);

    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(preExistingPost.id);
    expect(foundPost?.text).toBe(preExistingPost.text);
  });
});