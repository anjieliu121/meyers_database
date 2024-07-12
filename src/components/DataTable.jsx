import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
} from "@tanstack/react-table"
   
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button, buttonVariants } from "@/components/ui/button";

import Filter from "@/components/ui/filter"

import { CSVLink } from "react-csv";

import { useMemo } from 'react';

export function DataTable({columns, data,}) {
    //TODO: Figure out why DataTable rerenders 2x on filter & sort
    console.log("- DataTable Rerender");
    console.log(data);
    console.log(columns);
    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });
    
    /*Returns the JSON of the visible portion of the filtered table*/
    //TODO: Also sort the table before downloading
    //TODO: figure out a way to only calculate json when user actually
    //clicks the download button; might not use CSVLink for that
    const json = useMemo(() => {
    //e.target.data = [['hi', 'there']];
    //console.log(e.target);
    //e.preventDefault();
    const json = [];
    const headers = table.getHeaderGroups()[0].headers.map(header => header.id);
    //console.log(headers);
    json.push(headers);
    table.getFilteredRowModel().rows.forEach((row) => {
        const cells = row.getVisibleCells();
        const values = cells.map((cell) => cell.getValue() ?? '');
        //console.log(values);
        json.push(values);
    });
    console.log(json);
    //console.log(typeof json);
    console.log("JSON.stringify(table.getState()) changed");
    return json; 
    }, [JSON.stringify(table.getState())]);

    return (
    <>
    <div className="tw-rounded-md tw-border">
        {/*Download as CSV Button*/}
        {<CSVLink filename="my-file.csv" data={json}>
        Export to CSV
        </CSVLink>}

        {/*The actual table built with shadcn-ui & react-table apis.
        Note that the shadcn-ui components are just somewhat embellished
        wrappers of the barebones HTML table tags*/}
        <Table>
        {/*Table headers*/}
        {<TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                return (
                    <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                        <>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {/*Each column header allows user to input filters*/}
                        {header.column.getCanFilter() ? (
                            <div>
                            <Filter column={header.column} />
                            </div>
                        ) : null}
                        </>
                    )} 
                    </TableHead>
                )
                })}
            </TableRow>
            ))}
        </TableHeader>}
        {/*Table Body: The actual data*/}
        {<TableBody>
            {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
                <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
                </TableRow>
            ))
            ) : (
            <TableRow>
                <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center">
                No results.
                </TableCell>
            </TableRow>
            )}
        </TableBody>}
        </Table>
    </div>

    {/*Allows users to switch pages of data*/}
    {<div className="tw-flex tw-items-center tw-gap-2">
        <button
        className="tw-border tw-rounded tw-p-1"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
        >
        {'<<'}
        </button>
        <button
        className="tw-border tw-rounded tw-p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        >
        {'<'}
        </button>
        <button
        className="tw-border tw-rounded tw-p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        >
        {'>'}
        </button>
        <button
        className="tw-border tw-rounded tw-p-1"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
        >
        {'>>'}
        </button>
        <span className="tw-flex tw-items-center tw-gap-1">
        <div>Page</div>
        <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
        </strong>
        </span>
        <span className="tw-flex tw-items-center tw-gap-1">
        | Go to page:
        <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
            }}
            className="tw-border tw-p-1 tw-rounded tw-w-16"
        />
        </span>
        <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
            table.setPageSize(Number(e.target.value))
        }}
        >
        {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
            Show {pageSize}
            </option>
        ))}
        </select>
    </div>}
    </>
    )
}