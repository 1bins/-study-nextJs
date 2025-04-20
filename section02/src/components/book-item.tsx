import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.scss";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl
 }: BookData) {
  return(
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} alt={title}/>
      <div>
        <p className={style.title}>{title}</p>
        <p className={style.subTitle}>{subTitle}</p>
        <br/>
        <p className={style.author}>{author} | {publisher}</p>
      </div>
    </Link>
  );
}