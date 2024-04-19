import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import './CardsContainer.css';

type CardsContainerProps = {
  onClick: (repoId: number) => void; 
};

const CardsContainer = ({ onClick }: CardsContainerProps) => {
  const repositories = useSelector((state: RootState) => state.repository.data);
  const repositoryLoading = useSelector((state: RootState) => state.repository.loading);
  const userLoading = useSelector((state: RootState) => state.user.loading);

  const loading = repositoryLoading || userLoading;

  const halfLength = Math.ceil(repositories.length / 2);
  const leftColumn = repositories.slice(0, halfLength);
  const rightColumn = repositories.slice(halfLength);

  return (
    <div className="repositories-container">
      <h2>{loading && 'Loading Info'}</h2>
      <div className="repositories">
        <div className="left-column">
          {loading ? (
            <p>Loading repositories...</p>
          ) : (
            leftColumn.map((repo) => (
              <HorizontalCard key={repo.id} repo={repo} onClick={() => onClick(repo.id)} /> 
            ))
          )}
        </div>
        <div className="right-column">
          {loading ? null : (
            rightColumn.map((repo) => (
              <HorizontalCard key={repo.id} repo={repo} onClick={() => onClick(repo.id)} /> 
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
