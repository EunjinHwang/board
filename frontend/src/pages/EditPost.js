import {useRouteLoaderData} from 'react-router-dom'
import PostForm from '../components/PostForm'
function EditPostPage() {
    const data =useRouteLoaderData('post-detail');
    return (
        <PostForm method="patch" post= {data.post}/>);
}
export default EditPostPage;

