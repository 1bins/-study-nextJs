# NEXT 공부하기

## 페이지 라우터(Page Router)
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