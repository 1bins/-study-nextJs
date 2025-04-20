// NextJs는 다른 CSS와의 중복을 방지하기 위해 import를 app.tsx외에는 사용할 수 없음
// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.scss";
import {ReactNode} from "react";
import books from '@/mock/books.json';
import BookItem from "@/components/book-item";

export default function Home() {
  return (
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {books.map((book) =>
            <BookItem key={book.id} {...book} />
          )}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {books.map((book) =>
            <BookItem key={book.id} {...book} />
          )}
        </section>
      </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};