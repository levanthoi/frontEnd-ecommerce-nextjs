import React from 'react';

export interface ICateProd {
  _id?: string;
  key?: React.Key;
  name: string;
  status?: boolean;
  parent?: React.Key;
  image?: string | any;
  slug?: string;
  description: string;
  order: number;
  children?: ICateProd[];
  // module?: string;
  // actions?: React.ReactNode;
}
