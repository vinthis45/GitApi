import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/userSlice';
import { fetchRepositories } from '../features/repositorySlice';
import HorizontalCard from '../components/HorizontalCard/HorizontalCard';
import { RootState } from '../features/store';
import CardsContainer from '../components/CardContainer/CardsContainer';

const Homepage = () => {
  const [username, setUsername] = useState<string>('');
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.data);
  const repositories = useSelector((state: RootState) => state.repository.data);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchUser(username) as any);
    dispatch(fetchRepositories(username) as any);
  };

  return (
    <div>
      <h1>Github User Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Github username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {userData && (
        <div>
          <h2>User Information</h2>
          <img src={userData.avatar_url} alt="Avatar" />
          <p>Name: {userData.name}</p>
          <p>Bio: {userData.bio}</p>
          <p> Repositories: {userData.public_repos}</p>
        </div>
      )}

      {repositories && (
        <CardsContainer />
      )}
    </div>
  );
};

export default Homepage;
