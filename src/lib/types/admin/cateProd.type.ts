import React from 'react';

export interface ICateProd {
  key: React.Key;
  name: string;
  status?: boolean;
  module?: string;
  parent?: string;
  image?: string;
  slug?: string;
  // actions?: React.ReactNode;
}
