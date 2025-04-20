// NextJs는 다른 CSS와의 중복을 방지하기 위해 import를 app.tsx외에는 사용할 수 없음
// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.scss";
import {ReactNode} from "react";

export default function Home() {
  return (
      <>
        <h1 className={style.h1}>인덱스</h1>
        <h2 className={style.h2}>H2</h2>
      </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};