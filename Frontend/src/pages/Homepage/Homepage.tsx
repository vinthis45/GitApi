import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/userSlice';
import { fetchRepositories } from '../../features/repositorySlice';
import { RootState } from '../../features/store';
import CardsContainer from '../../components/CardContainer/CardsContainer';
import RepoDescription from '../RepoDescription/RepoDescription';
import "./Homepage.css"

const Homepage = () => {
  const [username, setUsername] = useState<string>('');
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null); 
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

  const handleCardClick = (repoId: number) => {
    console.log("repo clicked", repoId)
    setSelectedRepoId(repoId); 
  };

  return (
    <div>
      <div className='header'>
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
      </div>
      {userData && (
        <div className='user-card'>
          <div className='user-info'>
            <div className='user-image'>
              <img src={userData.avatar_url} alt="Avatar" />
            </div>
            <div className='user-details'>
              <p>Name: {userData.name}</p>
              <p>Bio: {userData.bio}</p>
              <p> Repositories: {userData.public_repos}</p>
            </div>
          </div>
        </div>
      )}

      {selectedRepoId ? (
        <RepoDescription repoId={selectedRepoId} /> 
      ) : (
        <CardsContainer onClick={handleCardClick} /> 
      )}
    </div>
  );
};

export default Homepage;
