import classes from './PostsList.module.css';
//import {useLoaderData} from 'react-router-dom';
import { Link } from 'react-router-dom';
function PostsList({posts}) {
  //const posts = useLoaderData();
  return (
    <div className={classes.posts}>
      <h1 style={{color:'black'}}>게시글</h1>
      <ul className={classes.list}>
        {posts.map((post) => (
          <li key={post.id} className={classes.item}>
            <Link to={post.id}>
              <img src={post.image} alt={post.title} />
              <div className={classes.content}>
                <h2>{post.title}</h2>
                <time>{post.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
