import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../ui/card';
import { Button } from '../ui/button';

const ClubCard = ({ club, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <Card 
      animate={true} 
      animationType="slide-up"
      animationDelay={index * 0.1} // Stagger animation for lists of cards
      className="w-full max-w-sm mx-auto"
    >
      <CardHeader>
        <CardTitle>{club.name}</CardTitle>
        <CardDescription>{club.department}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600">{club.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">Members: {club.memberCount}</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">{club.status}</span>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button
          variant="ghost"
          animate={true}
          animationDelay={(index * 0.1) + 0.2}
          onClick={() => navigate(`/clubs/${club.id}`)}
        >
          View Details
        </Button>
        <Button
          animate={true}
          animationDelay={(index * 0.1) + 0.3}
          onClick={() => navigate(`/clubs/${club.id}/join`)}
        >
          Join Club
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;