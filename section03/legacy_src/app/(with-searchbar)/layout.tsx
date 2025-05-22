import Searchbar from "@/components/searchBar";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return(
    <div>
      <Searchbar/>
      {children}
    </div>
  )
}