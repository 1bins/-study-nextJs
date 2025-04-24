// NextJs는 다른 CSS와의 중복을 방지하기 위해 import를 app.tsx외에는 사용할 수 없음
// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.scss";
import {ReactNode} from "react";
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// SSR 방식으로 작동
/*
export const getServerSideProps = async () => {
  // 오직 서버에서만 실행됨!
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();
  
  // promise.all로 병렬 가져오기
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ])

  return {
    props: {
      allBooks,
      recoBooks,
    }
  }
};
*/

// SSG(정적) 방식으로 작동
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ])

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // ISR 방식 (몇 초 주기로 인덱스 페이지 재검증할지)
    // revalidate: 3,

    // on-Demand ISR 방식
  }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) =>
            <BookItem key={book.id} {...book} />
          )}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) =>
            <BookItem key={book.id} {...book} />
          )}
        </section>
      </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};