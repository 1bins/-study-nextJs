import style from "./page.module.css";
import {BookData} from "@/types";
import {notFound} from "next/navigation";

// generateStaticParams 내보내진 값 외에는 전부 404로 보내버림
// export const dynamicParams = false;

export function generateStaticParams() {
  // 어떠한 url 파라미터가 빌드타임에 생성될 수 있을지
  // 빌드타임에 id가 1~3인 페이지 미리 생성됨
  return [{id: "1"}, {id: "2"}, {id: "3"}];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>
  }
  const book: BookData = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
