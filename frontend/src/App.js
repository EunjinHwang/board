import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import PostsPage, { loader as postsLoader } from './pages/Posts';
import PostDetailPage, { loader as postDetailLoader, action as deletePostAction } from './pages/PostDetail';
import NewPostPage from './pages/NewPost';
import EditPostPage from './pages/EditPost';
import RootLayout from './pages/Root';
import PostsRootLayout from './pages/PostsRoot';
import ErrorPage from './pages/Error';
import {action as manipulatePostAction} from './components/PostForm';
import AuthenticationPage, {action as authAction} from './pages/Authentication';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'auth',
        element: <AuthenticationPage/>,
        action: authAction,
      },
      {
        path: 'posts', element: <PostsRootLayout />, children: [
          {
            index: true,
            element: <PostsPage />,
            loader: postsLoader,
          },
          {
            path: ':postId',
            id: 'post-detail',
            loader: postDetailLoader,
            children: [
              {
                index: true,
                element: <PostDetailPage />,
                action: deletePostAction
              },
              {
                path: 'edit',
                element: <EditPostPage />,
                action: manipulatePostAction
              },
            ],
          },
          {
            path: 'new',
            element: <NewPostPage />,
            action: manipulatePostAction
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
