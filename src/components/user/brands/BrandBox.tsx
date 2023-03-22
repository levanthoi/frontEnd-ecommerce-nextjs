import React from 'react';

interface Props {
  name: string;
  image: string;
}

const BrandBox: React.FC<Props> = ({ name, image }) => {
  return (
    <div className="p-3 w-full h-full">
      <img src={image} alt={name} />
    </div>
  );
};

export default BrandBox;
