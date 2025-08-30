interface Project {
  id: number;
  title: string;
  location: string;
  capacity: string;
  image: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'VOLKSWAGEN',
    location: 'RICHMOND, CA',
    capacity: '116KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_Volkswagen.jpg',
    category: 'Comercial'
  },
  {
    id: 2,
    title: 'HOLIDAY INN',
    location: 'DRIPPING SPRINGS, TX',
    capacity: '80.7KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_Holiday-inn-express.jpg',
    category: 'Hotelero'
  },
  {
    id: 3,
    title: 'CHASE BANK',
    location: 'DENTON, TX',
    capacity: '50KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_Chase-bank.jpg',
    category: 'Bancario'
  },
  {
    id: 4,
    title: 'CITY OF MURRIETA',
    location: 'MURRIETA, CA',
    capacity: '503KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_City-of-murrieta.jpg',
    category: 'Gubernamental'
  },
  {
    id: 5,
    title: 'NEW HOPE CHURCH',
    location: 'HILO, HI',
    capacity: '113KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_New-hope-chuch.jpg',
    category: 'Religioso'
  },
  {
    id: 6,
    title: 'HILLSIDE MEMORIAL',
    location: 'CULVER CITY, CA',
    capacity: '338KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_Hillside-memorial.jpg',
    category: 'Institucional'
  },
  {
    id: 7,
    title: 'HYUNDAI',
    location: 'RICHMOND, CA',
    capacity: '45KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_Hyundai.jpg',
    category: 'Industrial'
  },
  {
    id: 8,
    title: 'GUAM RESORTS',
    location: 'TAMUNING, GUAM',
    capacity: '445KW',
    image: 'https://o3energy.com/wp-content/uploads/2019/12/O3_Project_Guam-resorts.jpg',
    category: 'Hotelero'
  }
];
