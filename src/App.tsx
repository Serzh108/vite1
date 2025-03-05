import { useState } from 'react';
import './App.css';
import { useGetAllPostsQuery, useAddPostMutation } from './services/posts';

function App() {
  const [postTitle, setPostTitle] = useState('');
  const [viewsAmount, setViewsAmount] = useState(0);
  const { data = [], isLoading, error } = useGetAllPostsQuery('');
  const [addPost, { isError }] = useAddPostMutation();
  console.log('data -> ', data);
  console.log(' - postTitle -> ', postTitle, ', viewsAmount: ', viewsAmount);

  const handleAddPost = async () => {
    if (postTitle && viewsAmount >= 0) {
      addPost({ title: postTitle, views: viewsAmount }).unwrap();
      setPostTitle('');
      setViewsAmount(0);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
        />
        <input
          type="number"
          value={viewsAmount}
          onChange={e => setViewsAmount(+e.target.value)}
        />
        <button className="addBtn" onClick={handleAddPost}>
          add post
        </button>
      </div>
      <div>
        {error ? (
          <h2>ERROR!</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : data ? (
          <>
            {data.map(post => (
              <p
                key={
                  post?.id
                }>{`Title: ${post?.title} Veiws: ${post?.views}`}</p>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
