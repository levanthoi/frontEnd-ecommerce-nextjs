import React from 'react';

export interface ICateProd {
  _id: React.Key;
  key: React.Key;
  name: string;
  status?: boolean;
  parent?: React.Key;
  image?: string;
  slug?: string;
  description: string;
  order: number;
  children?: ICateProd[];
  // module?: string;
  // actions?: React.ReactNode;
}
