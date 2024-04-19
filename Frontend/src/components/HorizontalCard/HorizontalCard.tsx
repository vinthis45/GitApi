import React from 'react';
import './HorizontalCard.css';

export type Repository = {
    id: number;
    name: string;
    description: string;
    owner?: {
        avatar_url: string;
    };
};


type HorizontalCardProps = {
    repo: Repository;
    onClick: (repoId: number) => void; 
  };
  

const HorizontalCard = ({ repo }: HorizontalCardProps) => {
    return (
        <div className="horizontal-card">
            <div className="horizontal-card-content">
                <div className="horizontal-card-image">
                    {repo.owner && repo.owner.avatar_url && (
                        <img src={repo.owner.avatar_url} alt="Avatar" />
                    )}
                </div>
                <div className="horizontal-card-details">
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;
