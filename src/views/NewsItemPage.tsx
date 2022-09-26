import { ApiResponse } from 'apisauce';
import React, { useState, useEffect } from 'react';
import { NewsData } from 'types/interfaces.js';
import { api } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import FetchedNewsItem from '../components/FetchedNewsItem';

const NewsItemPage: React.FC = () => {
  const [news, setNews] = useState<NewsData>();

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchNewsItem = async () => {
    const response: ApiResponse = await api.selectedNews(id);

    if (response.ok) setNews(response.data);
    else alert(response.error.toString());
  }

  useEffect(() => {
    fetchNewsItem();
  }, []);

  return (
    <>
      {news ? (
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <button onClick={() => navigate(-1)} type="button" className="btn btn-outline-danger">
              Назад
            </button>
            <span>
              Автор: {news.by}<br/>
              Дата публикации: {new Date(news.time * 1000).toLocaleDateString('ru')}
            </span>
            <button onClick={() => fetchNewsItem()} type="button" className="btn btn-outline-success">
              Обновить
            </button>
          </div>

          <div className="card-body">
            <h5 className="card-title">{news.title}</h5>
            <p className="card-text">Рейтинг: {news.score}</p>
            <a href={news.url} className="btn btn-primary mb-2">Читать исходник...</a>
            {news.kids && <p>Комментариев: {news.kids?.length}</p>}
          </div>

          <div>
            {news.kids?.map(commentId => (
              <FetchedNewsItem key={commentId} itemId={commentId} />
            ))}
          </div>
        </div>
      ) : (null)}
    </>
  )
}

export default NewsItemPage;