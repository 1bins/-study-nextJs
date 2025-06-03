"use server";

import {revalidatePath} from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/`, {
      method: "POST",
      body: JSON.stringify({
        bookId,
        content,
        author
      })
    });
    console.log(response.status);
    revalidatePath(`/book/${bookId}`); // path로 전달한 페이지의 캐시를 전부 비워버리고 다시 가져옴 => force-cache 무시, 서버 컴포넌트에서만 호출할 수 있음
  } catch(err){
    console.error(err);
    return;
  }
}