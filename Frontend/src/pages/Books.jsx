import React, { useState, useEffect } from 'react'; // Import useEffect
import { motion } from 'framer-motion';

// --- Reusable Star Rating Component (No changes) ---
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      {halfStar && (
        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
       <span className="ml-2 text-gray-600 text-sm">({rating})</span>
    </div>
  );
};

// --- Framer Motion Variants for Animation (No changes) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- Reusable Book Card (No changes) ---
const BookCard = ({ title, author, rating, description, coverImageUrl, bookLink }) => {
  return (
    <a href={bookLink} target="_blank" rel="noopener noreferrer" className="block h-full">
      <motion.div
        variants={cardVariants}
        className="h-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
      >
        <img className="w-full h-48 object-cover" src={coverImageUrl} alt={`Cover for ${title}`} />
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm font-semibold text-teal-500 mb-2">{author}</p>
            <div className="my-2">
                <StarRating rating={rating} />
            </div>
            <p className="text-gray-700 text-sm mt-2">
                {description}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <span className="text-teal-600 font-semibold hover:text-indigo-800 transition-colors">
                Locate On
            </span>
          </div>
        </div>
      </motion.div>
    </a>
  );
};

// --- Category Row Component (No changes) ---
const CategoryRow = ({ title, books }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const initialCardCount = 4;
    
    const booksToShow = isExpanded ? books : books.slice(0, initialCardCount);
    const canExpand = books.length > initialCardCount;

    return (
        <div className="mb-12">
            <div className="flex justify-between items-baseline mb-4 px-4 sm:px-0">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                {canExpand && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-semibold text-teal-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        {isExpanded ? 'View Less' : 'View More ➤'}
                    </button>
                )}
            </div>
            <motion.div
                key={isExpanded ? `${title}-expanded` : `${title}-collapsed`}
                className={isExpanded 
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' 
                    : 'flex space-x-6 overflow-x-auto pb-4'
                }
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {booksToShow.map((book, index) => (
                    <div key={index} className={isExpanded ? '' : 'flex-shrink-0 w-64'}>
                        <BookCard {...book} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};


// --- Main Page Component for the Library (UPDATED) ---
const BookBingeLibraryPage = () => {
  // ADDED: This hook scrolls the window to the top whenever the component loads.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // The empty array ensures this effect runs only once on mount.

const categorizedBooks = {
  "Fantasy": [
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      rating: 4.5,
      description: "Bilbo Baggins, a humble hobbit, is thrust into an unexpected adventure to reclaim a lost dwarf kingdom guarded by the fearsome dragon Smaug.",
      coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
      bookLink: "https://rsd2-alert-durden-reading-room.weebly.com/uploads/6/7/1/6/6716949/the_hobbit_tolkien.pdf",
    },
    {
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      rating: 4.6,
      description: "Four siblings enter the magical world of Narnia through a wardrobe, where they must help Aslan defeat the White Witch and bring back peace.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL3676511M-L.jpg",
      bookLink: "https://ia800401.us.archive.org/5/items/LewisCSNarnia3TheHorseAndHisBoy/Lewis_C_S_-_Narnia_2_-_The_Lion_The_Witch_and_The_.pdf",
    },
    {
      title: "The Wonderful Wizard of Oz",
      author: "L. Frank Baum",
      rating: 4.5,
      description: "Dorothy Gale is whisked away to the magical Land of Oz, where she meets a scarecrow, a tin man, and a lion on her quest to return home.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL26337286M-L.jpg",
      bookLink: "https://archive.org/download/wonderfulwizardo00baumiala/wonderfulwizardo00baumiala.pdf",
    },
    {
      title: "Alice's Adventures in Wonderland",
      author: "Lewis Carroll",
      rating: 4.5,
      description: "Alice tumbles down a rabbit hole into a bizarre world full of talking creatures, riddles, and the mad Queen of Hearts.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL35347405M-L.jpg",
      bookLink: "https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf",
    },
    {
      title: "Peter Pan and Wendy",
      author: "J.M. Barrie",
      rating: 4.5,
      description: "Wendy and her brothers fly with Peter Pan to Neverland, a place of pirates, fairies, and eternal youth, where adventure never ends.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL3289316M-L.jpg",
      bookLink: "https://archive.org/download/cu31924009450788/cu31924009450788.pdf",
    },
    {
      title: "The Fellowship of the Ring",
      author: "J.R.R. Tolkien",
      rating: 4.5,
      description: "Frodo Baggins inherits the One Ring and joins a fellowship to destroy it in Mount Doom before it falls into the hands of the Dark Lord Sauron.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL13569251M-L.jpg",
      bookLink: "https://archive.org/download/j-r-r-tolkien-lord-of-the-rings-01-the-fellowship-of-the-ring-retail-pdf/j-r-r-tolkien-lord-of-the-rings-01-the-fellowship-of-the-ring-retail-pdf.pdf",
    },
    {
      title: "Prince Caspian",
      author: "C.S. Lewis",
      rating: 4.5,
      description: "The Pevensie siblings return to Narnia to help Prince Caspian reclaim his throne and restore peace to the land overtaken by Telmarines.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL1403467M-L.jpg",
      bookLink: "https://dn720006.ca.archive.org/0/items/english-collections-k-z/Prince%20Caspian%20-%20C.%20S.%20Lewis.pdf",
    },
    {
      title: "The Silver Chair",
      author: "C.S. Lewis",
      rating: 4.5,
      description: "Eustace and Jill journey through Narnia on a mission to rescue Prince Rilian, the lost heir to the throne, trapped under an evil enchantment.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL31967838M-L.jpg",
      bookLink: "https://www.samizdat.qc.ca/arts/lit/PDFs/TheSilverChair_CSL.pdf",
    },
    {
      title: "The Horse and His Boy",
      author: "C.S. Lewis",
      rating: 4.5,
      description: "A runaway boy and a talking horse journey across Narnia to warn of an impending invasion, discovering their true identities along the way.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL20316061M-L.jpg",
      bookLink: "https://archive.org/download/FantasyFictionebookcollection/Chronicles%20of%20Narnia/5-The%20Horse%20and%20His%20Boy.pdf",
    },
    {
      title: "The Last Battle",
      author: "C.S. Lewis",
      rating: 4.5,
      description: "The final battle for Narnia unfolds as good and evil clash in a powerful conclusion to the Chronicles of Narnia series.",
      coverImageUrl: "https://covers.openlibrary.org/b/olid/OL30152672M-L.jpg",
      bookLink: "https://archive.org/download/TheLastBattle_201812/The%20Last%20Battle.pdf",
    },
 
  ],
  "Mythological-Books": [
    {
      title: "The Ramayana",
      author: "Valmiki",
      rating: 4.8,
      description: "An ancient Sanskrit epic that narrates the life of Prince Rama, his exile, the abduction of his wife Sita by the demon king Ravana, and Rama’s quest to rescue her with the help of Lord Hanuman.",
      coverImageUrl: "https://i.pinimg.com/736x/66/dd/c4/66ddc40d895208649668f74df692de0e.jpg",
      bookLink: "https://archive.org/download/ramayanaofvalmik01valm/ramayanaofvalmik01valm.pdf",
    },
    {
      title: "The Mahabharata",
      author: "Krishna-Dwaipayana Vyasa",
      rating: 4.7,
      description: "The world’s longest epic poem, recounting the great Kurukshetra war between the Pandavas and Kauravas, filled with philosophy, devotion, and lessons on dharma and karma.",
      coverImageUrl: "https://i.pinimg.com/474x/bc/a1/c5/bca1c56988def8d0f9a0161a87cb050f.jpg",
      bookLink: "https://ia803400.us.archive.org/7/items/the-complete-mahabharata/The%20Complete%20Mahabharata%20.pdf",
    },
    {
      title: "Bhagavad Gita",
      author: "Krishna Dvaipayana Vyasa",
      rating: 4.8,
      description: "A sacred Hindu scripture that presents a dialogue between Prince Arjuna and Lord Krishna, offering timeless wisdom on duty, life, and spiritual awakening.",
      coverImageUrl: "https://i.pinimg.com/736x/6b/9c/26/6b9c2669f522fef954c8bffbc3ce342b.jpg",
      bookLink: "https://ignca.gov.in/Asi_data/279.pdf",
    },
    {
      title: "Indian Myth and Legend",
      author: "Donald A. Mackenzie",
      rating: 4.8,
      description: "A comprehensive collection of Indian legends, myths, and folktales explaining the stories of gods, heroes, and creation drawn from Vedic, Puranic, and folk traditions.",
      coverImageUrl: "https://i.pinimg.com/736x/0f/55/7a/0f557a9718019150c6d7160575f5aa69.jpg",
      bookLink: "https://archive.org/download/indianmythlegend00mack/indianmythlegend00mack.pdf",
    },
    {
      title: "Legends and Theories of the Buddhists",
      author: "Robert Spence Hardy",
      rating: 4.7,
      description: "A study comparing Buddhist beliefs and stories with history and science, providing insight into the life and teachings of Gautama Buddha.",
      coverImageUrl: "https://i.pinimg.com/736x/a4/fb/6f/a4fb6f91ddd418e0c829decbc4893714.jpg",
      bookLink: "https://upload.wikimedia.org/wikipedia/commons/4/4f/The_Legends_and_Theories_of_the_Buddhists%2C_Compared_With_History_and_Science-_With_Introductory_Notices_of_the_Life_and_System_of_Gotama_Buddha_%28IA_legendstheorieso00rspe%29.pdf",
    },
    {
      title: "Stories of Indian Gods and Heroes",
      author: "W.D. Monro",
      rating: 4.6,
      description: "A delightful retelling of the adventures and virtues of India’s deities and heroes, introducing readers to the core characters of Hindu mythology.",
      coverImageUrl: "https://i.pinimg.com/736x/ec/3e/8c/ec3e8c657e2809aa6cde4e3578a18133.jpg",
      bookLink: "https://ia601605.us.archive.org/26/items/storiesofindiasg00monr/storiesofindiasg00monr.pdf",
    },
    {
      title: "Hindu Gods and Heroes",
      author: "Lionel David Barnett",
      rating: 4.7,
      description: "An insightful exploration of Hindu gods and divine figures, their symbolism, and their roles in shaping Indian culture and spirituality.",
      coverImageUrl: "https://i.pinimg.com/736x/14/3e/3e/143e3eb6cfd456bd2f5e081fdf919864.jpg",
      bookLink: "https://www.holybooks.com/wp-content/uploads/Hindu-Gods-and-Heroes.pdf",
    },
    {
      title: "The Vishnu Purana",
      author: "Veda Vyasa",
      rating: 4.8,
      description: "One of the major Puranas, this text narrates the creation of the universe, genealogies of gods and kings, and praises Lord Vishnu as the supreme deity.",
      coverImageUrl: "https://i.pinimg.com/736x/82/f5/f7/82f5f75ac3e94bba185d054943325846.jpg",
      bookLink: "https://vedpuran.net/wp-content/uploads/2011/10/vishnu-puran.pdf",
    },
    {
      title: "The Shiva Purana",
      author: "J.L. Shastri",
      rating: 4.8,
      description: "Dedicated to Lord Shiva, this Purana contains fascinating stories, rituals, and spiritual teachings glorifying Shiva as the eternal source of creation and destruction.",
      coverImageUrl: "https://i.pinimg.com/736x/2e/82/ad/2e82ad041f6ca0bf50b2e45bc60b4e38.jpg",
      bookLink: "https://dn721606.ca.archive.org/0/items/2_20201208_20201208_1659/%E0%A4%B6%E0%A4%BF%E0%A4%B5%20%E0%A4%AA%E0%A5%81%E0%A4%B0%E0%A4%BE%E0%A4%A3%20%282%29.pdf",
    },
    {
      title: "The Upanishads",
      author: "Swami Paramananda",
      rating: 4.9,
      description: "A collection of profound philosophical texts that form the spiritual core of Hinduism, exploring concepts like the soul (Atman), ultimate reality (Brahman), and enlightenment.",
      coverImageUrl: "https://i.pinimg.com/736x/25/31/4a/25314ac01a0a12bdd6a773c3c4890af2.jpg ",
      bookLink: "https://estudantedavedanta.net/The-Upanishads-Translated-by-Swami-Paramananda.pdf",
    },
   
  ],
  "Programming-Books": [
   {
    title: "Fluent Python",
    author: "Luciano Ramalho",
    rating: 4.8,
    description: "Deep dive into Python's advanced features, including data structures, functions, and metaprogramming.",
    coverImageUrl: "https://i.pinimg.com/736x/26/16/b4/2616b4a43e6500fc8671a4128fe52546.jpg",
    bookLink: "https://elmoukrie.com/wp-content/uploads/2022/05/luciano-ramalho-fluent-python_-clear-concise-and-effective-programming-oreilly-media-2022.pdf",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    rating: 4.7,
    description: "A modern introduction to JavaScript, covering syntax, functional programming, and web development concepts.",
    coverImageUrl: "https://i.pinimg.com/736x/07/fd/0e/07fd0e4f49b6e8cd5cef1971b91b7f3a.jpg",
    bookLink: "https://eloquentjavascript.net/Eloquent_JavaScript_small.pdf",
  },
  {
    title: "Learning Python",
    author: "Mark Lutz",
    rating: 4.6,
    description: "Comprehensive guide to Python programming language, including object-oriented programming and standard libraries.",
    coverImageUrl: "https://i.pinimg.com/736x/be/d6/f5/bed6f5e70cac80dc7d4c374b58f24a3f.jpg",
    bookLink: "https://cfm.ehu.es/ricardo/docs/python/Learning_Python.pdf",
  },
  {
    title: "Effective Java",
    author: "Joshua Bloch",
    rating: 4.9,
    description: "Best practices for Java programming, covering design patterns, concurrency, and language pitfalls.",
    coverImageUrl: "https://i.pinimg.com/736x/be/36/f8/be36f85217ee2705cbb1d688c0b07523.jpg",
    bookLink: "https://kea.nu/files/textbooks/new/Effective%20Java%20%282017%2C%20Addison-Wesley%29.pdf",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 4.7,
    description: "Guidelines and techniques to write readable, maintainable, and efficient code in any language.",
    coverImageUrl: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
    bookLink: "https://book.northwind.ir/bookfiles/clean-code-a-handbook-of-agile-software-craftsmanship/Clean.Code.A.Handbook.of.Agile.Software.Craftsmanship.pdf",
  },
  {
    title: "Code Complete",
    author: "Steve McConnell",
    rating: 4.8,
    description: "Comprehensive software construction guide emphasizing coding practices, debugging, and software design.",
    coverImageUrl: "https://i.pinimg.com/736x/f4/1e/e0/f41ee0374465f8f4ec601993234d19be.jpg",
    bookLink: "https://ptgmedia.pearsoncmg.com/images/9780735619678/samplepages/9780735619678.pdf",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    rating: 4.7,
    description: "Authoritative textbook covering algorithms, data structures, and complexity analysis in detail.",
    coverImageUrl: "https://i.pinimg.com/736x/b5/e6/a3/b5e6a3e6fcc47950438fc42966d691c4.jpg",
    bookLink: "https://www.cs.mcgill.ca/~akroit/math/compsci/Cormen%20Introduction%20to%20Algorithms.pdf",
  },
  {
    title: "The Clean Coder",
    author: "Robert C. Martin",
    rating: 4.6,
    description: "Professional conduct guide for programmers, including ethics, responsibility, and software craftsmanship.",
    coverImageUrl: "https://images-na.ssl-images-amazon.com/images/I/41-sN-mzwKL._SX380_BO1,204,203,200_.jpg",
    bookLink: "https://ptgmedia.pearsoncmg.com/images/9780137081073/samplepages/0137081073.pdf",
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    rating: 4.7,
    description: "Classic guide on reusable object-oriented design patterns, crucial for scalable software architecture.",
    coverImageUrl: "https://i.pinimg.com/736x/e7/6a/e7/e76ae7cf9b2278ae90dc987e15cfe657.jpg",
    bookLink: "https://www.javier8a.com/itc/bd1/articulo.pdf",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    rating: 4.8,
    description: "Comprehensive guide to building modern, scalable, and fault-tolerant data systems.",
    coverImageUrl: "https://i.pinimg.com/736x/bd/93/8a/bd938afc278af32c84f778cae28ce414.jpg ",
    bookLink: "https://unidel.edu.ng/focelibrary/books/Designing%20Data-Intensive%20Applications%20The%20Big%20Ideas%20Behind%20Reliable,%20Scalable,%20and%20Maintainable%20Systems%20by%20Martin%20Kleppmann%20(z-lib.org).pdf",
  },
    
  ],

"Sci-Fi-Books": [
    {
    title: "Dune",
    author: "Frank Herbert",
    rating: 4.7,
    description: "Set in a distant future, a young noble must navigate politics, religion, and ecology on the desert planet Arrakis.",
    coverImageUrl: "https://i.pinimg.com/736x/8b/01/db/8b01db86e2d93aa18072299048967f3f.jpg",
    bookLink: "https://dn720004.ca.archive.org/0/items/english-collections-1/Dune%20Messiah%20-%20Frank%20Herbert.pdf",
  },
  {
    title: "Neuromancer",
    author: "William Gibson",
    rating: 4.5,
    description: "A cyberpunk classic where a washed-up computer hacker is hired for one last job in a dystopian future.",
    coverImageUrl: "https://i.pinimg.com/736x/37/67/91/376791bfd99d8bd8af3a8dc93be50e0c.jpg",
    bookLink: "https://dn720006.ca.archive.org/0/items/neuromancer_202209/neuromancer.pdf",
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    rating: 4.6,
    description: "A mathematician predicts the fall of a galactic empire and works to preserve knowledge to shorten the coming dark age.",
    coverImageUrl: "https://i.pinimg.com/736x/ef/b0/47/efb04740669354281c055963a4036f5c.jpg",
    bookLink: "https://s3.us-west-1.wasabisys.com/luminist/EB/A/Asimov%20-%20Foundation.pdf",
  },
  {
    title: "Ender's Game",
    author: "Orson Scott Card",
    rating: 4.7,
    description: "A young boy is trained through simulated battles to become humanity's savior in an interstellar war against aliens.",
    coverImageUrl: "https://i.pinimg.com/736x/45/9e/e8/459ee878f4ad82c6b38970c01eb3f42b.jpg",
    bookLink: "https://resources.finalsite.net/images/v1563819368/rcsdms/zubpw0ly7e6g3rm1n3fk/EndersGame.pdf",
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    rating: 4.8,
    description: "An astronaut stranded on Mars must use science and ingenuity to survive while awaiting rescue.",
    coverImageUrl: "https://i.pinimg.com/736x/e5/52/02/e5520252b03ada02c6eb3f004a38b135.jpg",
    bookLink: "https://dl2.languagecentre.ir/novels/The-Martian%20[www.languagecentre.ir].pdf",
  },
  {
    title: "Snow Crash",
    author: "Neal Stephenson",
    rating: 4.5,
    description: "A hacker and a courier navigate a virtual reality and a dystopian America to stop a mind-altering virus.",
    coverImageUrl: "https://i.pinimg.com/736x/07/b2/c0/07b2c0c183df45c0d70ddc8717c2d68f.jpg",
    bookLink: "https://hell.pl/agnus/anglistyka/2211/Neal%20Stephenson%20-%20Snow%20Crash.pdf",
  },
  {
    title: "Hyperion",
    author: "Dan Simmons",
    rating: 4.6,
    description: "In a distant future, travelers share their life stories on a pilgrimage to the mysterious and deadly Time Tombs.",
    coverImageUrl: "https://i.pinimg.com/736x/b0/41/a7/b041a7f8e1c501f5d18bc315e4f24530.jpg",
    bookLink: "https://cdnc.heyzine.com/files/uploaded/v2/abffed7858cec9689efa90d9be4545f30015f2d5.pdf",
  },
  {
    title: "Ready Player One",
    author: "Ernest Cline",
    rating: 4.6,
    description: "In a dystopian future, a teenager searches for an Easter egg in a virtual world that promises fame and fortune.",
    coverImageUrl: "https://i.pinimg.com/736x/30/2a/68/302a688ca2ee7a2dad16ca8bedaf376d.jpg",
    bookLink: "https://asmsummerreading.weebly.com/uploads/1/2/5/7/125763472/ready-player-one.pdf",
  },
  {
    title: "Old Man's War",
    author: "John Scalzi",
    rating: 4.5,
    description: "Senior citizens are recruited to fight in interstellar wars with enhanced bodies and futuristic technology.",
    coverImageUrl: "https://i.pinimg.com/736x/7d/5f/3f/7d5f3f8aa2624eee2adb1417156607a0.jpg",
    bookLink: "https://cdn.bookey.app/files/pdf/book/en/old-man's-war.pdf",
  },
  {
    title: "RingWorld Engineers",
    author: "Larry Niven",
    rating: 4.6,
    description: "An interstellar expedition sets out to explore a massive artificial ring-shaped structure orbiting a distant star, known as the Ringworld.",
    coverImageUrl: "https://i.pinimg.com/736x/dd/4f/61/dd4f611fe9f835d5c78e9955724f6bb1.jpg",
    bookLink: "https://cdn.bookey.app/files/pdf/book/en/the-ringworld-engineers.pdf",
  },
  ],

"Comics & Anime-Books": [
    {
    title: "Naruto, Vol. 1",
    author: "Masashi Kishimoto",
    rating: 4.8,
    description: "Follow the story of Naruto Uzumaki, a young ninja seeking recognition and dreaming of becoming the Hokage.",
    coverImageUrl: "https://i.pinimg.com/736x/d7/be/b3/d7beb32a2ac6f8c8df1b7adbe6a1da75.jpg",
    bookLink: "https://cdn.bookey.app/files/pdf/book/en/naruto--vol-1.pdf",
  },
  {
    title: "Watchman",
    author: "Alan Moore & Dave Gibbons",
    rating: 4.9,
    description: "In an alternate 1985 where costumed heroes are outlawed, a group of retired vigilantes investigates the brutal murder of one of their own, uncovering a dark and complex conspiracy that pushes their fragile morals to the brink.",
    coverImageUrl: "https://i.pinimg.com/736x/c8/51/5e/c8515ec44d3a556ce3c1bd3ba3fa92b2.jpg",
    bookLink: "https://whynotcomicbooks.wordpress.com/wp-content/uploads/2019/06/watchmen-ch.-1.pdf",
  },
  {
    title: "Attack on Titan, Vol. 1",
    author: "Hajime Isayama",
    rating: 4.7,
    description: "In a world besieged by giants, humanity fights for survival as Eren Yeager discovers his hidden powers.",
    coverImageUrl: "https://i.pinimg.com/736x/c1/68/a7/c168a7e7967e65fce80bb02feed759a0.jpg",
    bookLink: "https://cdn.bookey.app/files/pdf/book/en/attack-on-titan--vol-1.pdf",
  },
  {
    title: "Death Note, Vol. 1",
    author: "Tsugumi Ohba & Takeshi Obata",
    rating: 4.8,
    description: "A high school student discovers a notebook that allows him to kill anyone whose name he writes in it.",
    coverImageUrl: "https://i.pinimg.com/736x/66/60/35/6660352229c21c3d24fa26ff6755181a.jpg",
    bookLink: "https://cdn.bookey.app/files/pdf/book/en/death-note--vol-1.pdf",
  },
  {
  title: "Saga",
  author: "Brian K. Vaughan & Fiona Staples",
  rating: 4.7,
  description: "An epic sci-fi fantasy comic that follows two lovers from warring extraterrestrial races as they struggle to protect their child from the forces trying to tear their family apart. Blending elements of space opera and fantasy, 'Saga' explores themes of love, war, parenthood, and survival with stunning artwork and emotional storytelling.",
  coverImageUrl: "https://i.pinimg.com/736x/67/2c/ff/672cff9dbda9077a46729bf316e4b153.jpg",
  bookLink: "https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf",
},

  {
    title: "Batman: The Killing Joke",
    author: "Alan Moore & Brian Bolland",
    rating: 4.8,
    description: "A dark and psychological exploration of the Joker's origin story and his twisted relationship with Batman.",
    coverImageUrl: "https://i.pinimg.com/736x/5f/8a/75/5f8a759d95a557c94b1c469802661cf9.jpg",
    bookLink: "https://batmancrimesolver.wordpress.com/wp-content/uploads/2012/10/fumetti-ita-batman-the-killing-joke-dc.pdf",
  },
  {
    title: "The Dark Knight Returns",
    author: "Frank Miller",
    rating: 4.9,
    description: "In a dystopian future, an aging Bruce Wayne comes out of retirement to fight crime in Gotham City once again.",
    coverImageUrl: "https://i.pinimg.com/736x/fe/68/2f/fe682f505e04e6181a7947bebce4d978.jpg",
    bookLink: "https://theteacherscrate.wordpress.com/wp-content/uploads/2014/03/batman-the-dark-knight-returns.pdf",
  },
  {
    title: "Superman: Red Son",
    author: "Mark Millar",
    rating: 4.6,
    description: "What if Superman had landed in the Soviet Union instead of Kansas? This alternate reality explores the clash between Superman and the American way of life during the Cold War.",
    coverImageUrl: "https://i.pinimg.com/736x/17/13/7c/17137c6cc979cd7c3fe5fc8c323d173b.jpg",
    bookLink: "https://whynotcomicbooks.wordpress.com/wp-content/uploads/2018/09/rr-3-superman-red-son-exert.pdf",
  },
  {
    title: "Y: The Last Man",
    author: "Brian K. Vaughan & Pia Guerra",
    rating: 4.7,
    description: "After a mysterious plague wipes out all male mammals except for one man",
    coverImageUrl: "https://i.pinimg.com/736x/73/9a/76/739a76a78eeb11154da03db032a95b4f.jpg",
    bookLink: "https://alexcassun.wordpress.com/wp-content/uploads/2012/08/y-the-last-man.pdf",
  },
  {
    title: "Black Science",
    author: "Rick Remender & Matteo Scalera",
    rating: 4.8,
    description: "A group of scientists accidentally tear a hole in the fabric of reality, leading to dangerous adventures across parallel universes.",
    coverImageUrl: "https://i.pinimg.com/736x/74/a9/a8/74a9a8308ab8f7ecf9cff81a9715b72a.jpg",
    bookLink: "https://cdn.bookey.app/files/pdf/book/en/black-science.pdf",
  },
  ],

};


  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 tracking-tight">Welcome to BookBinge</h1>
          <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
            Explore our curated collections and find your next great read.
          </p>
        </div>
        <div className="space-y-8">
          {Object.entries(categorizedBooks).map(([category, booksList]) => (
            <CategoryRow key={category} title={category} books={booksList} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookBingeLibraryPage;














































