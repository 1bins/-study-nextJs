import {BookData} from "@/types";
import style from "./[id].module.scss";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchOneBook from "@/lib/fetch-one-book";


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id; // !. 단언은 undefined가 아닐거다라고 알려줌
  const book = await fetchOneBook(Number(id));
  
  return {
    props: {
      book
    }
  }
}

export default function Page({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if(!book) return "문제가 발생했습니다 다시 시도하세요"

    const {
      id,
      title,
      subTitle,
      description,
      author,
      publisher,
      coverImgUrl
    }: BookData = book;

    return (
      <div className={style.container}>
          <div
            className={style.cover_img_container}
            style={{backgroundImage: `url('${coverImgUrl}')`}}>
              <img src={coverImgUrl} alt={title}/>
          </div>
          <div className={style.cover_text_container}>
              <p className={style.title}>{title}</p>
              <p className={style.subTitle}>{subTitle}</p>
              <p className={style.author}>{author} | {publisher}</p>
              <p className={style.description}>{description}</p>
          </div>
      </div>
    );
}