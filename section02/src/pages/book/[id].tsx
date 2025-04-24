import {BookData} from "@/types";
import style from "./[id].module.scss";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import {useRouter} from "next/router";
import Head from "next/head";


export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // !. 단언은 undefined가 아닐거다라고 알려줌
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      book
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true
    /**
     * fallback options
     *
     * - false: 404 페이지 반환
     * - blocking: SSR 방식
     * - true: SSR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환 (blocking의 경우 404로 바로 이동)
     */
  }
}

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if(router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og.image" content="/thumbnail.png" />
          <meta property="og.title" content="한입북스" />
          <meta property="og.description" content="한입북스 등록된 도서들을 만나보세요" />
        </Head>
        <div>로딩중입니다...</div>
      </>
    )
  }
  if(!book) return "문제가 발생했습니다 다시 시도하세요"

  const {
    // id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl
  }: BookData = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og.image" content={coverImgUrl}/>
        <meta property="og.title" content={title}/>
        <meta property="og.description" content={description}/>
      </Head>
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
    </>
  );
}