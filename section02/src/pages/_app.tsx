import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const onClickButton = () => {
        router.push("/test");
        // replace: 뒤로가기 방지하면서 이동
        // back: 뒤로가기
    };
    
    /**
     * prefetch
     * => 현재 페이지에 연결된 페이지들의 JS번들링을 미리 요청함
     * */
    useEffect(() => {
      // onClickButton에 프로그래머틱하게 이동을 구현했기 때문에 pre-fetch를 직접적으로 구현해준다
      router.prefetch("/test");

      // Link태그에 prefetch={false}를 부여하여 해제할 수도 있다.
    }, []);

  return (
      <>
        <header>
            <Link href={"/"}>index</Link>
            &nbsp;
            <Link href={"/search"} prefetch={false}>search</Link>
            &nbsp;
            <Link href={"/book/1"}>book/1</Link>
            <div>
                <button onClick={onClickButton}>/test 페이지로 이동</button>
            </div>
        </header>
        <Component {...pageProps} />
      </>
  )
}
