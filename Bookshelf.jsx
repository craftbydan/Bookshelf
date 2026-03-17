import React, { useState, useEffect, useMemo } from 'react';

/* ──────────────────────────────────────────────────────────
   TITLE FONT SIZE — length-based, no randomness
────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────
   BOOKS — replace with your actual 50
────────────────────────────────────────────────────────── */
const BOOKS = [
  // ── PSYCHOLOGY ────────────────────────────────────────
  { title: 'Thinking, Fast and Slow',        author: 'Daniel Kahneman',         genre: 'Psychology'  },
  { title: 'Flow',                            author: 'Mihaly Csikszentmihalyi', genre: 'Psychology'  },
  { title: "Man's Search for Meaning",        author: 'Viktor Frankl',           genre: 'Psychology'  },
  { title: 'The Power of Habit',              author: 'Charles Duhigg',          genre: 'Psychology'  },
  { title: 'Influence',                       author: 'Robert Cialdini',         genre: 'Psychology'  },
  { title: 'Lost Connections',                author: 'Johann Hari',             genre: 'Psychology'  },

  // ── PHILOSOPHY ────────────────────────────────────────
  { title: 'The Almanack of Naval Ravikant',  author: 'Eric Jorgenson',          genre: 'Philosophy'  },
  { title: 'The Myth of Sisyphus',            author: 'Albert Camus',            genre: 'Philosophy'  },
  { title: 'Thus Spoke Zarathustra',          author: 'Friedrich Nietzsche',     genre: 'Philosophy'  },
  { title: 'Tao Te Ching',                    author: 'Lao Tzu',                 genre: 'Philosophy'  },
  { title: 'Beyond Good and Evil',            author: 'Friedrich Nietzsche',     genre: 'Philosophy'  },

  // ── HISTORY ───────────────────────────────────────────
  { title: 'Sapiens',                         author: 'Yuval Noah Harari',       genre: 'History'     },
  { title: 'Guns, Germs, and Steel',          author: 'Jared Diamond',           genre: 'History'     },
  { title: 'The Silk Roads',                  author: 'Peter Frankopan',         genre: 'History'     },
  { title: 'Homo Deus',                       author: 'Yuval Noah Harari',       genre: 'History'     },
  { title: 'The Lessons of History',          author: 'Will Durant',             genre: 'History'     },

  // ── MEMOIR ────────────────────────────────────────────
  { title: 'When Breath Becomes Air',         author: 'Paul Kalanithi',          genre: 'Memoir'      },
  { title: 'Educated',                        author: 'Tara Westover',           genre: 'Memoir'      },
  { title: 'Born a Crime',                    author: 'Trevor Noah',             genre: 'Memoir'      },
  { title: 'The Glass Castle',                author: 'Jeannette Walls',         genre: 'Memoir'      },
  { title: 'Shoe Dog',                        author: 'Phil Knight',             genre: 'Memoir'      },

  // ── BUSINESS ──────────────────────────────────────────
  { title: 'Zero to One',                     author: 'Peter Thiel',             genre: 'Business'    },
  { title: 'The Lean Startup',                author: 'Eric Ries',               genre: 'Business'    },
  { title: 'Good to Great',                   author: 'Jim Collins',             genre: 'Business'    },
  { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz',           genre: 'Business'    },
  { title: 'Rework',                          author: 'Jason Fried',             genre: 'Business'    },
  { title: 'Founders at Work',                author: 'Jessica Livingston',      genre: 'Business'    },

  // ── FINANCE ───────────────────────────────────────────
  { title: 'The Psychology of Money',         author: 'Morgan Housel',           genre: 'Finance'     },
  { title: 'The Intelligent Investor',        author: 'Benjamin Graham',         genre: 'Finance'     },
  { title: 'A Random Walk Down Wall Street',  author: 'Burton Malkiel',          genre: 'Finance'     },
  { title: 'Die With Zero',                   author: 'Bill Perkins',            genre: 'Finance'     },

  // ── STOICISM ──────────────────────────────────────────
  { title: 'Meditations',                     author: 'Marcus Aurelius',         genre: 'Stoicism'    },
  { title: 'The Obstacle Is the Way',         author: 'Ryan Holiday',            genre: 'Stoicism'    },
  { title: 'Stillness Is the Key',            author: 'Ryan Holiday',            genre: 'Stoicism'    },
  { title: 'A Guide to the Good Life',        author: 'William Irvine',          genre: 'Stoicism'    },
  { title: 'Letters from a Stoic',            author: 'Seneca',                  genre: 'Stoicism'    },

  // ── DESIGN ────────────────────────────────────────────
  { title: 'The Design of Everyday Things',   author: 'Don Norman',              genre: 'Design'      },
  { title: 'Grid Systems',                    author: 'Josef Müller-Brockmann',  genre: 'Design'      },
  { title: 'Thinking with Type',              author: 'Ellen Lupton',            genre: 'Design'      },
  { title: 'The Elements of Typographic Style', author: 'Robert Bringhurst',    genre: 'Design'      },
  { title: 'Steal Like an Artist',            author: 'Austin Kleon',            genre: 'Design'      },

  // ── MUSIC ─────────────────────────────────────────────
  { title: 'Scenery',                         author: 'Ryo Fukui',               genre: 'Music'       },
  { title: 'Just Kids',                       author: 'Patti Smith',             genre: 'Music'       },
  { title: 'The Creative Act',                author: 'Rick Rubin',              genre: 'Music'       },
  { title: 'How Music Works',                 author: 'David Byrne',             genre: 'Music'       },

  // ── SCIENCE ───────────────────────────────────────────
  { title: 'A Brief History of Time',         author: 'Stephen Hawking',         genre: 'Science'     },
  { title: 'The Gene',                        author: 'Siddhartha Mukherjee',    genre: 'Science'     },
  { title: 'Why We Sleep',                    author: 'Matthew Walker',          genre: 'Science'     },
  { title: 'The Code Breaker',                author: 'Walter Isaacson',         genre: 'Science'     },
  { title: 'Astrophysics for People in a Hurry', author: 'Neil deGrasse Tyson', genre: 'Science'     },
];

/* ──────────────────────────────────────────────────────────
   CLOCK
────────────────────────────────────────────────────────── */
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <span className="shelf-clock">
      {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────
   STATUS
────────────────────────────────────────────────────────── */
function Status() {
  const isOpen = () => { const h = new Date().getHours(); return h >= 8 && h < 24; };
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpen()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="shelf-status">
      <span className={`status-dot ${open ? 'open' : 'closed'}`} />
      {open ? 'OPEN' : 'CLOSED'}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────
   GENRE FILTER
────────────────────────────────────────────────────────── */
function GenreFilter({ genres, genreCounts, active, onSelect }) {
  return (
    <nav className="genre-filter" role="navigation" aria-label="Filter by genre">
      <button
        className={`genre-btn ${active === null ? 'is-active' : ''}`}
        onClick={() => onSelect(null)}
      >
        ALL <span className="genre-count">{BOOKS.length}</span>
      </button>
      {genres.map(g => (
        <button
          key={g}
          className={`genre-btn ${active === g ? 'is-active' : ''}`}
          onClick={() => onSelect(g)}
        >
          {g} <span className="genre-count">{genreCounts[g]}</span>
        </button>
      ))}
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────
   BOOK ENTRY
────────────────────────────────────────────────────────── */
function BookEntry({ book }) {
  return (
    <article className="book-entry">
      <h2 className="book-title">
        {book.title}
      </h2>
      <div className="book-meta">
        <span>{book.author}</span>
        <span className="book-meta-sep">·</span>
        <span className="book-genre">{book.genre}</span>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────
   APP
────────────────────────────────────────────────────────── */
export default function Bookshelf() {
  const [activeGenre, setActiveGenre] = useState(null);

  const genres = useMemo(() => {
    const seen = new Set();
    const order = [];
    BOOKS.forEach(b => {
      if (!seen.has(b.genre)) { seen.add(b.genre); order.push(b.genre); }
    });
    return order;
  }, []);

  const genreCounts = useMemo(() => {
    const counts = {};
    BOOKS.forEach(b => { counts[b.genre] = (counts[b.genre] || 0) + 1; });
    return counts;
  }, []);

  const visibleBooks = useMemo(
    () => activeGenre ? BOOKS.filter(b => b.genre === activeGenre) : BOOKS,
    [activeGenre]
  );

  const total = String(BOOKS.length).padStart(3, '0');
  const shown = visibleBooks.length;

  return (
    <div className="shelf-page">
      <header className="shelf-header">
        <div className="shelf-header-top">
          <span className="shelf-label">Reading List</span>
          <Clock />
        </div>
        <div className="shelf-header-bottom">
          <span className="shelf-name">Dan</span>
          <Status />
        </div>
      </header>

      <GenreFilter
        genres={genres}
        genreCounts={genreCounts}
        active={activeGenre}
        onSelect={setActiveGenre}
      />

      <main className="shelf-books">
        {visibleBooks.map(book => (
          <BookEntry key={book.title} book={book} />
        ))}
      </main>

      <footer className="shelf-footer">
        <span className="footer-lib">Dan's Library</span>
        <span className="footer-count">
          {activeGenre
            ? `${String(shown).padStart(2, '0')} of ${total} volumes`
            : `${total} volumes`}
        </span>
      </footer>
    </div>
  );
}
