# NEXT 공부하기

## 페이지 라우터(Page Router)
설치 `npx create-next-app@14` 

**장점**
1. 파일 시스템 기반의 간편한 페이지 라우팅 제공
2. 다양한 방식의 사전 렌더링 제공

**단점**
1. 페이지별 레이아웃 설정이 번거롭다 (`getLayout` 메서드)
2. 데이터 페칭이 페이지 컴포넌트에 집중된다 (`getServerSideProps`, `getStaticProps`)
3. 불필요한 컴포넌트들도 JS Bundle에 포함된다

### SSR vs SSG
#### SSR(Server Side Rendering)
- `getServerSideProps`
- **페이지가 요청될 때마다 서버에서 HTML을 생성**해 클라이언트에 전달
- 사용자마다 다른 데이터를 보여줄 때 유용 (ex. 로그인한 사용자에 따라 다르게 보여야 하는 대시보드)

```tsx
export async function getServerSideProps(context) {
  ...
}
```
> - 요청마다 HTML 생성 → 최신 데이터 보장
> - 성능 느릴 수 있음(서버 부하 가능성 있음)

#### SSG(Static Site Generation)
- `getStaticProps`
- **빌드 시 미리 HTML을 생성**해서 정적 파일로 저장
- 모든 사용자에게 같은 데이터를 보여주는 페이지에 적합
```tsx
 export async function getStaticProps() {
  ...
}
```
> - 빠른 속도(CDN에 올릴 수 있음)
> - 데이터가 자주 바뀌는 페이지에 부적합
> - SEO에 좋음

#### ISR(Incremental Static Regeneration) - 증분 정적 재생성
- 빌드 타임에 생성된 정적 페이지를, 일정 시간마다 서버에서 백그라운드로 새로 만들어주는 기능
- SSG방식에서 `revalidate` 추가
```tsx
export const getStaticProps = async () => {
  ...

  return {
    props: {},
    // ISR 방식 (몇 초 주기로 인덱스 페이지 재검증할지)
    revalidate: 3
  }
}; 
```

### SEO 설정하기

```tsx
import Head from "next/head";

export default function Page() {
  return(
    <div>
      <Head>
        <title>타이틀</title>
        <meta property="og.image" content="/썸네일.jpg"/> <!-- public경로 -->
        <meta property="og.title" content="타이틀"/>
        <meta property="og.description" content="설명"/>
      </Head>
      
      {content}
    </div>
  )
}
```

### 배포하기
- 설치 `npm install -g vercel`
- 로그인 `vercel login`
- 배포 `vercel`
- 프로덕션 모드 배포 `vercel --prod`

<br>

## 앱 라우터
설치 `npx create-next-app@latest`