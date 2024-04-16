import { Form } from 'react-router-dom';
import { useNavigate, useNavigation } from 'react-router-dom';
import {json, redirect, useActionData } from 'react-router-dom';
import classes from './PostForm.module.css';

function PostForm({ method, post }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required
          defaultValue={post ? post.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required
          defaultValue={post ? post.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required
          defaultValue={post ? post.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required
          defaultValue={post ? post.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default PostForm;

export async function action({ request, params }) {
  const data = await request.formData();
  const method = request.method;
  const postData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  let url = 'http://localhost:8080/posts';
  if (method === 'PATCH') {
    const postId = params.postId;
    url = 'http://localhost:8080/posts/' + postId;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw json({ message: 'Could not save post.' }, { status: 500 });
  }

  return redirect('/posts');
}
