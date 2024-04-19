import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';

type RepoDescriptionProps = {
  repoId: number;
};

const RepoDescription = ({ repoId }: RepoDescriptionProps) => {
  const repositories = useSelector((state: RootState) => state.repository.data);
  const selectedRepo = repositories.find(repo => repo.id === repoId); 

  if (!selectedRepo) {
    return <div>Repository not found</div>; 
  }

  return (
    <div className="repository-description">
      <h2>Repository Description</h2>
      <div>
        <h3>{selectedRepo.name}</h3>
        <p>{selectedRepo.description}</p>
      </div>
    </div>
  );
};

export default RepoDescription;
