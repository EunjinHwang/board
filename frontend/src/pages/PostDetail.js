import { useRouteLoaderData, json, redirect } from 'react-router-dom'
import PostItem from '../components/PostItem'
function PostDetailPage() {
    const data = useRouteLoaderData('post-detail');
    return (
        <PostItem post={data.post} />
    );
}
export default PostDetailPage;

export async function loader({ request, params }) {
    const id = params.postId;
    const response = await fetch('http://localhost:8080/posts/' + id);
    if(!response.ok){
        throw json({ message: 'Couold not fetch details for select post' }, {
            status: 500
        });
    } {
        return response;
    }
}

export async function action({ params, request }) {
    const postId = params.postId;
    const response = await fetch('http://localhost:8080/posts/' + postId, {
        method: request.method
    });

    if (!response.ok) {
        throw json({ message: 'Couold not delete post' }, {
            status: 500
        });
    }
    return redirect('/posts')
}