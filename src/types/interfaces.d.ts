// Описание базового набора данных счетчика
export interface NewsData {
  id: number,
  title: string,
  url: string,
  score: number,
  by: string,
  time: number,
  kids?: NewsComment,
  type: string,
  deleted?: boolean,
  text?: string
}

export interface CommentData {
  id: number,
  text: string,
  by: string,
  time: number,
}

export interface ItemProps {
  itemId: number
}

export interface StateData {
  newsIds: any,
  status: string,
  error: string
}

export interface NewsPayload {
  ok: bollean,
  data?: NewsData[],
  errors?: any,
}
