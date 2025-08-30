
import React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Project {
  image: string;
  name: string;
  location: string;
  capacity: string;
}

export interface TeamMember {
  image: string;
  name: string;
  title: string;
}

export interface SocialLink {
    href: string;
    icon: React.ReactNode;
}
