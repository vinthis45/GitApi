import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import { Repository } from '../HorizontalCard/HorizontalCard';
import './CardsContainer.css'

const CardsContainer = () => {
  const repositories = useSelector((state: RootState) => state.repository.data); 
  const midIndex = Math.ceil(repositories.length / 2); 

  const leftColumn = repositories.slice(0, midIndex); 
  const rightColumn = repositories.slice(midIndex); 

  return (
    <div className="repositories-container">
      <h2>Repositories</h2>
      <div className="repositories">
        <div className="left-column">
          {leftColumn.map((repo) => (
            <HorizontalCard key={repo.id} repo={repo} />
          ))}
        </div>
        <div className="right-column">
          {rightColumn.map((repo) => (
            <HorizontalCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
