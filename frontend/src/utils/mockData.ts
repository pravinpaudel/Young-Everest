export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  image?: string;
  stats?: {
    [key: string]: string | number;
  };
}

// export interface Fixture {
//   id: number;
//   homeTeam: string;
//   awayTeam: string;
//   date: string;
//   time: string;
//   venue: string;
//   competition: string;
//   homeScore?: number;
//   awayScore?: number;
//   isCompleted: boolean;
// }

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  slug: string;
}

// Mock Players Data
export const players: Player[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    position: 'Goalkeeper',
    number: 1,
    stats: {
      'Clean Sheets': 10,
      'Saves': 87,
      'Games': 25
    }
  },
  {
    id: 2,
    name: 'Samuel Rivera',
    position: 'Defender',
    number: 4,
    stats: {
      'Goals': 2,
      'Assists': 3,
      'Clean Sheets': 8
    }
  },
  {
    id: 3,
    name: 'Marcus Chen',
    position: 'Defender',
    number: 5,
    stats: {
      'Goals': 1,
      'Assists': 2,
      'Tackles': 67
    }
  },
  {
    id: 4,
    name: 'Daniel Watson',
    position: 'Midfielder',
    number: 8,
    stats: {
      'Goals': 5,
      'Assists': 11,
      'Pass Accuracy': '88%'
    }
  },
  {
    id: 5,
    name: 'Omar Patel',
    position: 'Midfielder',
    number: 10,
    stats: {
      'Goals': 12,
      'Assists': 8,
      'Pass Accuracy': '85%'
    }
  },
  {
    id: 6,
    name: 'Jamal Thompson',
    position: 'Forward',
    number: 9,
    stats: {
      'Goals': 18,
      'Assists': 4,
      'Shots on Target': 48
    }
  },
  {
    id: 7,
    name: 'Carlos Mendez',
    position: 'Forward',
    number: 11,
    stats: {
      'Goals': 15,
      'Assists': 7,
      'Shots on Target': 42
    }
  },
  {
    id: 8,
    name: 'Leo Nakamura',
    position: 'Defender',
    number: 2,
    stats: {
      'Goals': 0,
      'Assists': 5,
      'Tackles': 54
    }
  },
];

// // Mock Fixtures Data
// export const fixtures: Fixture[] = [
//   {
//     id: 1,
//     homeTeam: 'Young Everest FC',
//     awayTeam: 'Mountain Lions',
//     date: 'May 15, 2025',
//     time: '15:00',
//     venue: 'Green Valley Stadium',
//     competition: 'Regional League',
//     homeScore: 3,
//     awayScore: 1,
//     isCompleted: true
//   },
//   {
//     id: 2,
//     homeTeam: 'River City FC',
//     awayTeam: 'Young Everest FC',
//     date: 'May 22, 2025',
//     time: '19:30',
//     venue: 'River City Arena',
//     competition: 'Regional League',
//     homeScore: 0,
//     awayScore: 2,
//     isCompleted: true
//   },
//   {
//     id: 3,
//     homeTeam: 'Young Everest FC',
//     awayTeam: 'Forest Rangers',
//     date: 'May 29, 2025',
//     time: '16:00',
//     venue: 'Green Valley Stadium',
//     competition: 'Regional League',
//     isCompleted: false
//   },
//   {
//     id: 4,
//     homeTeam: 'Coastal United',
//     awayTeam: 'Young Everest FC',
//     date: 'June 5, 2025',
//     time: '20:00',
//     venue: 'Seaside Stadium',
//     competition: 'Cup Quarter-Final',
//     isCompleted: false
//   },
//   {
//     id: 5,
//     homeTeam: 'Young Everest FC',
//     awayTeam: 'Metro Stars',
//     date: 'June 12, 2025',
//     time: '16:00',
//     venue: 'Green Valley Stadium',
//     competition: 'Regional League',
//     isCompleted: false
//   },
// ];

// Mock News Data
export const news: NewsItem[] = [
  {
    id: 1,
    title: 'Young Everest FC Signs Rising Star Midfielder',
    date: 'May 10, 2025',
    excerpt: 'The club is proud to announce the signing of 19-year-old talent David Lee from the regional academy.',
    content: 'Young Everest Football Club is delighted to announce the signing of promising midfielder David Lee from the Regional Youth Academy. The 19-year-old talent has impressed scouts with his technical abilities and vision on the pitch.\n\nLee, who captained the academy team to the youth championship last season, has signed a three-year contract with the club. Manager Robert Wilson expressed his excitement about the new signing, stating, "David is exactly the kind of player we want at Young Everest FC. He embodies our philosophy of developing young talent and playing attractive football."\n\nThe young midfielder is expected to join the first team for training next week and might make his debut in the upcoming fixture against Forest Rangers.',
    category: 'Transfer News',
    slug: 'young-everest-signs-rising-star-midfielder'
  },
  {
    id: 2,
    title: 'Comeback Victory Against Mountain Lions',
    date: 'May 16, 2025',
    excerpt: 'Young Everest FC secured a thrilling 3-1 win after coming from behind against local rivals.',
    content: 'In a thrilling match at Green Valley Stadium, Young Everest FC demonstrated remarkable resilience, coming from behind to secure a 3-1 victory against local rivals Mountain Lions.\n\nThe match began with Mountain Lions taking an early lead in the 12th minute through a well-placed header by their captain. Young Everest FC struggled to find rhythm in the first half but came out transformed after the break.\n\nOmar Patel equalized with a spectacular free-kick in the 58th minute, igniting both the crowd and the team. Jamal Thompson put Young Everest FC ahead with a clinical finish in the 71st minute, and Carlos Mendez sealed the victory with a counterattack goal in added time.\n\nCoach Wilson praised the team\'s character: "This victory shows the fighting spirit of our squad. We never gave up and believed in our abilities even when trailing."',
    category: 'Match Report',
    slug: 'comeback-victory-against-mountain-lions'
  },
  {
    id: 3,
    title: 'Youth Academy Open Day Announced',
    date: 'May 18, 2025',
    excerpt: 'Young Everest FC will open its doors to young talent in the region for trials next month.',
    content: 'Young Everest Football Club has announced its annual Youth Academy Open Day, scheduled for June 20, 2025. The event provides an opportunity for talented young players aged 8-16 from the region to showcase their skills and potentially join the club\'s renowned youth setup.\n\nThe trials will be conducted at Green Valley Stadium under the supervision of the club\'s youth development team, led by Head of Youth Development, Sarah Johnson.\n\n"We\'re excited to see the next generation of football talent," said Johnson. "Our academy has a strong track record of developing players who progress to our first team, and we\'re committed to continuing this tradition."\n\nInterested participants need to register through the club\'s website by June 10. Parents or guardians must accompany all participants on the day.',
    category: 'Youth',
    slug: 'youth-academy-open-day-announced'
  },
  {
    id: 4,
    title: 'Clean Sheet Away Victory Boosts League Position',
    date: 'May 23, 2025',
    excerpt: 'A solid defensive performance and clinical finishing earned us a crucial 2-0 away win.',
    content: 'Young Everest FC climbed to third place in the Regional League table following an impressive 2-0 away victory against River City FC. The team displayed disciplined defensive organization and clinical finishing to secure all three points.\n\nDespite River City\'s strong home record, Young Everest took control early with Daniel Watson scoring a perfectly placed shot from outside the box in the 23rd minute. The team maintained their defensive solidity throughout, with goalkeeper Alex Johnson making several crucial saves.\n\nJamal Thompson doubled the lead in the 67th minute with his 18th goal of the season, effectively sealing the result. The clean sheet marks Johnson\'s 10th of the season, highlighting the team\'s defensive improvements in recent months.\n\nManager Robert Wilson was pleased with the performance: "To come to a difficult venue like this and not only win but keep a clean sheet shows our growth as a team. The players executed our game plan perfectly."',
    category: 'Match Report',
    slug: 'clean-sheet-away-victory-boosts-league-position'
  },
];
