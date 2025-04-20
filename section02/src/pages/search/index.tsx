import { useRouter } from "next/router";
import style from "./search.module.scss";
import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";

export default function Page() {
    const router = useRouter();
    const { q } = router.query;
    console.log(q)

    return <h1>Search {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
    return (<SearchableLayout>{page}</SearchableLayout>)
}