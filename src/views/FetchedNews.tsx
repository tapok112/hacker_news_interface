import React, { useEffect } from 'react'
import { getNewsIds } from 'store/rootReducer';
import { useAppDispatch, useAppSelector } from 'types/hooks';
import FetchedNewsItem from '../components/FetchedNewsItem';

const FetchedNews: React.FC = () => {
  const newsIds = useAppSelector(state => state.news.newsIds.slice(0,100));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewsIds());
    const interval = setTimeout(() => {
      dispatch(getNewsIds());
    }, 60000);
  
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark p-4">
        <span className="navbar-brand">
          Список новостей с API Hacker News
        </span>
        <button onClick={() => dispatch(getNewsIds())} type="button" className="btn btn-success">
          Обновить
        </button>
      </nav>

      <div className='container px-3'>
        {newsIds?.map(newsId => (
          <FetchedNewsItem key={newsId} itemId={newsId} />
        ))}
      </div>
    </>
  )
}

export default FetchedNews;
