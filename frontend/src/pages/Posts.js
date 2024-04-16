import { useLoaderData, json } from 'react-router-dom';
import PostsList from '../components/PostsList';

function PostsPage() {
  const data = useLoaderData();
  // if(data.isError){
  //   return <p>{data.message}</p>
  // }
  const posts = data.posts;
  return (
    <>
      <PostsList posts={posts} />;
    </>
  );
}

export default PostsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/posts');

  if (!response.ok) {
   // return {isError:true ,message: '포스트를 불러올 수 없습니다 ㅠ ㅠ'};
  //  throw new Response(JSON.stringify({message: '포스트를 불러올 수 없습니다😣'}, {
  //   status: 500,
  //  }));
  return json({message: '포스트를 불러올 수 없습니다😣'},{
    status: 500,
  });
  } else {
    return response;
  }
}