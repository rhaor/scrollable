export interface Post {
  id: string;
  username: string;
  imageUrl: string;
  likes: number;
  comments: Array<{ username: string; text: string }>;
  timeAgo: string;
  category: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  username: string;
  views: number;
  duration: string;
  category: string;
}

// Travel content
const travelContent = {
  posts: [
    {
      id: 'travel1',
      username: 'sarah_92',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
      likes: 3567,
      comments: [
        { username: 'mike_84', text: 'Wait... this is actually in Thailand? I thought it was Bali! 🗺️' },
        { username: 'emma_97', text: 'The hidden beach behind the temple is even better! DM me for directions ✈️' }
      ],
      timeAgo: '6h',
      category: 'travel'
    },
    {
      id: 'travel2',
      username: 'james_88',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
      likes: 2103,
      comments: [
        { username: 'lisa_95', text: 'That street food vendor changed my life! The secret sauce... 🌏' },
        { username: 'david_91', text: 'Did you try the durian ice cream? It\'s actually amazing!' }
      ],
      timeAgo: '8h',
      category: 'travel'
    },
    {
      id: 'travel3',
      username: 'anna_94',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
      likes: 4892,
      comments: [
        { username: 'tom_89', text: 'The sunrise at 4:30 AM was worth it! Pro tip: bring a jacket 📸' },
        { username: 'sophie_96', text: 'How did you get the temple all to yourself? Share your secrets!' }
      ],
      timeAgo: '3h',
      category: 'travel'
    },
    {
      id: 'travel4',
      username: 'alex_93',
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
      likes: 3245,
      comments: [
        { username: 'olivia_98', text: 'That hostel looks amazing! Is it the one near the night market? 💰' },
        { username: 'ryan_87', text: 'The rooftop bar has the best sunset views! Don\'t miss it!' }
      ],
      timeAgo: '5h',
      category: 'travel'
    }
  ],
  videos: [
    {
      id: 'travelvid1',
      username: 'lucas_90',
      title: 'I Found a Secret Beach in Thailand That Nobody Knows About 🌏',
      thumbnail: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=600&fit=crop',
      views: 125000,
      duration: '12:34',
      category: 'travel'
    },
    {
      id: 'travelvid2',
      username: 'mia_99',
      title: 'How I Traveled Europe for 2 Weeks Under $500 (Full Breakdown) 🇪🇺',
      thumbnail: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=600&fit=crop',
      views: 89000,
      duration: '15:21',
      category: 'travel'
    },
    {
      id: 'travelvid3',
      username: 'daniel_86',
      title: 'Bangkok Street Food Tour: 10 Dishes Under $1 Each 🍜',
      thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=600&fit=crop',
      views: 234000,
      duration: '8:45',
      category: 'travel'
    },
    {
      id: 'travelvid4',
      username: 'isabella_85',
      title: 'Swiss Alps Hiking: The Trail That Almost Killed Me 🏔️',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop',
      views: 167000,
      duration: '18:30',
      category: 'travel'
    }
  ]
};

// Games content
const gamesContent = {
  posts: [
    {
      id: 'games1',
      username: 'chris_82',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop',
      likes: 5678,
      comments: [
        { username: 'jake_79', text: 'Those custom keybinds are genius! Mind sharing your config? 🎮' },
        { username: 'lily_83', text: 'The new patch ruined everything! 😭' }
      ],
      timeAgo: '2h',
      category: 'games'
    },
    {
      id: 'games2',
      username: 'noah_81',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
      likes: 4321,
      comments: [
        { username: 'ava_78', text: 'RTX 4090 really makes a difference! Worth the upgrade? 🎯' },
        { username: 'ethan_80', text: 'Streaming setup goals! What\'s your internet speed?' }
      ],
      timeAgo: '4h',
      category: 'games'
    },
    {
      id: 'games3',
      username: 'william_77',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop',
      likes: 7890,
      comments: [
        { username: 'mia_76', text: 'That speedrun strat is broken! New WR incoming? 🏃' },
        { username: 'henry_75', text: 'The glitch at 2:34 is insane! How did you find it?' }
      ],
      timeAgo: '1h',
      category: 'games'
    },
    {
      id: 'games4',
      username: 'amelia_74',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
      likes: 3456,
      comments: [
        { username: 'benjamin_73', text: 'Found this at a garage sale for $5! Still sealed! 🕹️' },
        { username: 'charlotte_72', text: 'The nostalgia hits hard! Remember the cheat codes?' }
      ],
      timeAgo: '6h',
      category: 'games'
    }
  ],
  videos: [
    {
      id: 'gamesvid1',
      username: 'sebastian_71',
      title: 'My $10,000 Gaming Setup Tour (You Won\'t Believe the RGB) 🎮',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop',
      views: 345000,
      duration: '14:22',
      category: 'games'
    },
    {
      id: 'gamesvid2',
      username: 'victoria_70',
      title: 'I Broke the World Record in Super Mario 64 (After 1000 Attempts) 🏃',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
      views: 289000,
      duration: '20:15',
      category: 'games'
    },
    {
      id: 'gamesvid3',
      username: 'jack_69',
      title: 'First Look: The New Zelda Game is INSANE! (Spoiler Free Review) 🎯',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop',
      views: 456000,
      duration: '25:30',
      category: 'games'
    },
    {
      id: 'gamesvid4',
      username: 'emma_68',
      title: 'How I Improved My Aim by 200% in 30 Days (Secret Training Routine) 🎯',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
      views: 234000,
      duration: '12:45',
      category: 'games'
    }
  ]
};

// Books content
const booksContent = {
  posts: [
    {
      id: 'books1',
      username: 'sophia_67',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop',
      likes: 3124,
      comments: [
        { username: 'oliver_66', text: 'That plot twist at 75%... I\'m still not over it! 📚' },
        { username: 'ava_65', text: 'The author\'s note at the end made me cry!' }
      ],
      timeAgo: '5h',
      category: 'books'
    },
    {
      id: 'books2',
      username: 'liam_64',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop',
      likes: 4567,
      comments: [
        { username: 'emma_63', text: 'The way you styled this photo is everything! 📸' },
        { username: 'noah_62', text: 'Is that the special edition with the sprayed edges?' }
      ],
      timeAgo: '2h',
      category: 'books'
    },
    {
      id: 'books3',
      username: 'isabella_61',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop',
      likes: 2890,
      comments: [
        { username: 'mason_60', text: 'That ending... I need to discuss this with someone! 🤯' },
        { username: 'sophia_59', text: 'Our book club is reading this next month!' }
      ],
      timeAgo: '4h',
      category: 'books'
    },
    {
      id: 'books4',
      username: 'william_58',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop',
      likes: 3456,
      comments: [
        { username: 'olivia_57', text: 'The symbolism in chapter 7... mind blown!' },
        { username: 'james_56', text: 'The new translation is so much better!' }
      ],
      timeAgo: '7h',
      category: 'books'
    }
  ],
  videos: [
    {
      id: 'booksvid1',
      username: 'lucas_55',
      title: 'These Books Will Change Your Life (I\'m Not Kidding) 📖',
      thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
      views: 156000,
      duration: '18:45',
      category: 'books'
    },
    {
      id: 'booksvid2',
      username: 'mia_54',
      title: 'My 1000+ Book Collection Tour (You\'ll Be Jealous) 📚',
      thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop',
      views: 89000,
      duration: '15:30',
      category: 'books'
    },
    {
      id: 'booksvid3',
      username: 'henry_53',
      title: 'Hidden Meanings in Harry Potter That Will Blow Your Mind 🔍',
      thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
      views: 234000,
      duration: '22:15',
      category: 'books'
    },
    {
      id: 'booksvid4',
      username: 'amelia_52',
      title: 'Barnes & Noble Haul: 20 Books for Under $100 📚',
      thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop',
      views: 167000,
      duration: '12:45',
      category: 'books'
    }
  ]
};

// Sports content
const sportsContent = {
  posts: [
    {
      id: 'sports1',
      username: 'benjamin_51',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
      likes: 5678,
      comments: [
        { username: 'charlotte_50', text: 'That buzzer-beater was insane! 🏀' },
        { username: 'sebastian_49', text: 'The team\'s chemistry this season is unreal!' }
      ],
      timeAgo: '2h',
      category: 'sports'
    },
    {
      id: 'sports2',
      username: 'victoria_48',
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=400&fit=crop',
      likes: 4321,
      comments: [
        { username: 'jack_47', text: 'Perfect timing! What camera settings? 📸' },
        { username: 'emma_46', text: 'That dunk in slow-mo would be epic!' }
      ],
      timeAgo: '3h',
      category: 'sports'
    },
    {
      id: 'sports3',
      username: 'oliver_45',
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=400&fit=crop',
      likes: 6789,
      comments: [
        { username: 'ava_44', text: 'Your form is perfect! What\'s your routine? 💪' },
        { username: 'liam_43', text: 'Can you share your pre-workout meal?' }
      ],
      timeAgo: '1h',
      category: 'sports'
    },
    {
      id: 'sports4',
      username: 'isabella_42',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
      likes: 3456,
      comments: [
        { username: 'mason_41', text: 'The stats don\'t lie! MVP season incoming! 📊' },
        { username: 'sophia_40', text: 'That play at 3:45 was pure magic!' }
      ],
      timeAgo: '5h',
      category: 'sports'
    }
  ],
  videos: [
    {
      id: 'sportsvid1',
      username: 'william_39',
      title: 'Game-Winning Shot That Broke the Internet 🏆',
      thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=600&fit=crop',
      views: 456000,
      duration: '10:15',
      category: 'sports'
    },
    {
      id: 'sportsvid2',
      username: 'olivia_38',
      title: 'How I Lost 50 Pounds in 6 Months (Full Transformation) 💪',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=600&fit=crop',
      views: 234000,
      duration: '15:30',
      category: 'sports'
    },
    {
      id: 'sportsvid3',
      username: 'james_37',
      title: 'Secret Training Routine That Made Me Pro 🎯',
      thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=600&fit=crop',
      views: 345000,
      duration: '12:45',
      category: 'sports'
    },
    {
      id: 'sportsvid4',
      username: 'lucas_36',
      title: 'Post-Game Drama: What Really Happened in the Locker Room 🎙️',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=600&fit=crop',
      views: 189000,
      duration: '18:20',
      category: 'sports'
    }
  ]
};

// Crime content
const crimeContent = {
  posts: [
    {
      id: 'crime1',
      username: 'mia_35',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop',
      likes: 4231,
      comments: [
        { username: 'henry_34', text: 'The new evidence changes everything!' },
        { username: 'amelia_33', text: 'Did you see the latest update?' }
      ],
      timeAgo: '3h',
      category: 'crime'
    },
    {
      id: 'crime2',
      username: 'benjamin_32',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop',
      likes: 5678,
      comments: [
        { username: 'charlotte_31', text: 'That witness testimony is crucial! 🔍' },
        { username: 'sebastian_30', text: 'Have you considered the timeline?' }
      ],
      timeAgo: '2h',
      category: 'crime'
    },
    {
      id: 'crime3',
      username: 'victoria_29',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop',
      likes: 3456,
      comments: [
        { username: 'jack_28', text: 'The DNA evidence is fascinating!' },
        { username: 'emma_27', text: 'This changes the whole case!' }
      ],
      timeAgo: '4h',
      category: 'crime'
    },
    {
      id: 'crime4',
      username: 'oliver_26',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop',
      likes: 4321,
      comments: [
        { username: 'ava_25', text: 'This case needs more attention!' },
        { username: 'liam_24', text: 'Let\'s solve this together!' }
      ],
      timeAgo: '6h',
      category: 'crime'
    }
  ],
  videos: [
    {
      id: 'crimevid1',
      username: 'isabella_23',
      title: 'The Mystery That Stumped Police for 20 Years 🕵️',
      thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
      views: 256000,
      duration: '20:30',
      category: 'crime'
    },
    {
      id: 'crimevid2',
      username: 'mason_22',
      title: 'New Evidence in Famous Cold Case (You Won\'t Believe What We Found) 🎯',
      thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
      views: 189000,
      duration: '25:15',
      category: 'crime'
    },
    {
      id: 'crimevid3',
      username: 'sophia_21',
      title: 'Forensic Science: The Evidence That Solved the Case 🔬',
      thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
      views: 345000,
      duration: '15:45',
      category: 'crime'
    },
    {
      id: 'crimevid4',
      username: 'william_20',
      title: 'Cold Case: The Breakthrough That Changed Everything 🕵️',
      thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
      views: 234000,
      duration: '18:30',
      category: 'crime'
    }
  ]
};

// Feel-good content
const feelGoodContent = {
  posts: [
    {
      id: 'feelgood1',
      username: 'olivia_19',
      imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop',
      likes: 6789,
      comments: [
        { username: 'james_18', text: 'This made my whole week! 😊' },
        { username: 'lucas_17', text: 'The world needs more of this!' }
      ],
      timeAgo: '4h',
      category: 'feel-good'
    },
    {
      id: 'feelgood2',
      username: 'mia_16',
      imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop',
      likes: 5432,
      comments: [
        { username: 'henry_15', text: 'Exactly what I needed today! ✨' },
        { username: 'amelia_14', text: 'Sharing this with everyone!' }
      ],
      timeAgo: '2h',
      category: 'feel-good'
    },
    {
      id: 'feelgood3',
      username: 'benjamin_13',
      imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop',
      likes: 7890,
      comments: [
        { username: 'charlotte_12', text: 'This restored my faith in humanity! ❤️' },
        { username: 'sebastian_11', text: 'More stories like this please!' }
      ],
      timeAgo: '1h',
      category: 'feel-good'
    },
    {
      id: 'feelgood4',
      username: 'victoria_10',
      imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop',
      likes: 4567,
      comments: [
        { username: 'jack_9', text: 'This quote changed my life! 💫' },
        { username: 'emma_8', text: 'Saving this for later!' }
      ],
      timeAgo: '3h',
      category: 'feel-good'
    }
  ],
  videos: [
    {
      id: 'feelgoodvid1',
      username: 'oliver_7',
      title: 'Stranger Pays for Elderly Woman\'s Groceries (Her Reaction Will Make You Cry) 😊',
      thumbnail: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
      views: 345000,
      duration: '12:15',
      category: 'feel-good'
    },
    {
      id: 'feelgoodvid2',
      username: 'ava_6',
      title: 'Homeless Man Returns Lost Wallet (What Happens Next Will Restore Your Faith) 🌟',
      thumbnail: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
      views: 234000,
      duration: '15:30',
      category: 'feel-good'
    },
    {
      id: 'feelgoodvid3',
      username: 'liam_5',
      title: 'How I Turned My Life Around in 30 Days (The Secret Nobody Tells You) ☀️',
      thumbnail: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
      views: 456000,
      duration: '8:45',
      category: 'feel-good'
    },
    {
      id: 'feelgoodvid4',
      username: 'isabella_4',
      title: 'From Homeless to Millionaire: The Story That Will Inspire You 🎯',
      thumbnail: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
      views: 289000,
      duration: '18:20',
      category: 'feel-good'
    }
  ]
};

// Combine all content
const allContent = {
  travel: travelContent,
  games: gamesContent,
  books: booksContent,
  sports: sportsContent,
  crime: crimeContent,
  "feel-good": feelGoodContent
};

export const filterContentByCategories = (selectedCategories: string[]) => {
  const allPosts: Post[] = [];
  const allVideos: Video[] = [];

  // Add posts and videos from selected categories
  selectedCategories.forEach(category => {
    const categoryContent = allContent[category as keyof typeof allContent];
    if (categoryContent) {
      allPosts.push(...categoryContent.posts);
      allVideos.push(...categoryContent.videos);
    }
  });

  // Create a mixed but stable order by using a combination of category and post ID
  const sortedPosts = [...allPosts].sort((a, b) => {
    // First sort by category to ensure even distribution
    const categoryOrder = selectedCategories.indexOf(a.category) - selectedCategories.indexOf(b.category);
    if (categoryOrder !== 0) return categoryOrder;
    // Then sort by post ID within each category
    return a.id.localeCompare(b.id);
  });

  const sortedVideos = [...allVideos].sort((a, b) => a.id.localeCompare(b.id));

  return {
    posts: sortedPosts,
    videos: sortedVideos
  };
}; 