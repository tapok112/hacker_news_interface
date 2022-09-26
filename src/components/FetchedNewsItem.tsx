import { ApiResponse } from 'apisauce';
import React, { useState, useEffect } from 'react';
import { ItemProps, NewsData } from 'types/interfaces.js';
import { api } from '../api/api';
import { Link } from 'react-router-dom';
import { time2TimeAgo } from 'timeAgo';

const FetchedNewsItem: React.FC<ItemProps> = ({ itemId }) => {
  const [item, setItem] = useState<NewsData>();
  const [showDiscussion, setShowDiscussion] = useState<boolean>(false);

  const fetchNewsItem = async () => {
    const response: ApiResponse = await api.selectedNews(itemId);

    if (response.ok) setItem(response.data);
    else alert(response.error.toString());
  }

  useEffect(() => {
    fetchNewsItem();
    const interval = setTimeout(() => {
      fetchNewsItem();
    }, 60000);  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {item ? (
        (item.type === 'story') ? (
          <div className="card mb-2 mt-2">
            <div className="card-header">Автор: {item.by}</div>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">Рейтинг: {item.score}</p>
              <Link to={`/${item.id}`} className="btn btn-primary">Подробнее...</Link>
            </div>
            <div className="card-footer text-muted">
              Дата публикации: {new Date(item.time * 1000).toLocaleDateString('ru')}
            </div>
          </div>
        ) : (
          !item.deleted && <div className="card mb-2 mt-2">
            <div className="card-header">
              {item.by}&nbsp;{time2TimeAgo(item.time)}
            </div>

            <div className="card-body">
              <p className="card-text" dangerouslySetInnerHTML={{__html: item.text }} />
            </div>

            {item.kids && (
              <button onClick={() => setShowDiscussion(prev => !prev)} type="button" className="btn btn-outline-info w-25 m-2">
                {!showDiscussion ? 'Посмотреть обсуждения' : 'Свернуть'}
              </button>)}
            {item.kids && showDiscussion && (<div className='px-5'>
                {item.kids?.map(commentId => (
                  <FetchedNewsItem key={commentId} itemId={commentId} />
                ))}
              </div>)}
          </div>
        )        
      ) : (null)}
    </>
  )
}

export default FetchedNewsItem;