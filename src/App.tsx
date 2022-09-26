import React from 'react';
import FetchedNews from './views/FetchedNews';
import { Routes, Route } from 'react-router-dom';
import NewsItemPage from 'views/NewsItemPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<FetchedNews />} />
      <Route path='/:id' element={<NewsItemPage />} />
    </Routes>
  );
}
