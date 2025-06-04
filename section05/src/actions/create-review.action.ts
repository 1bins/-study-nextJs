"use server";

import {revalidateTag} from "next/cache";

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
    // path로 전달한 페이지의 캐시를 전부 비워버리고 다시 가져옴 => force-cache 무시, 서버 컴포넌트에서만 호출할 수 있음
    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('book/[id]', 'page');

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 4. 모든 데이터 재검증
    // revalidatePath('/', 'layout');

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag("review-${bookId}");

  } catch(err){
    console.error(err);
    return;
  }
}