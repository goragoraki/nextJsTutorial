import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import Table from '@/app/ui/invoices/table';
import { InvoiceSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";
import { fetchInvoicesPages } from "@/app/lib/data";

// searchParams vs useSearchParams()
// searchParams는 서버 컴포넌트 일때 
// useSearchParams 클라이언트 컴포넌트 일때 => server로 갈 필요가 없어짐 

export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<
        {
            query?: string;
            page?: string;
        }>;
}) {
    const params = await searchParams;
    const query = params?.query || '';
    const currentPage = Number(params?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoiceSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}