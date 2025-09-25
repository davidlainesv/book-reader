'use client';

import dynamic from 'next/dynamic';

// Use dynamic import to avoid hydration mismatch issues
// since the BookReaderApp uses client-side APIs like window and document
const BookReaderAppDynamic = dynamic(
  () => import('./book-reader/BookReaderApp'),
  { ssr: false }
);

export default function BookReaderApp() {
  return <BookReaderAppDynamic />;
}
