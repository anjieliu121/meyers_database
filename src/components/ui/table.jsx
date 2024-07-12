import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="tw-relative tw-w-full tw-overflow-auto">
    <table
      ref={ref}
      className={cn("tw-w-full tw-caption-bottom tw-text-sm", className)}
      {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:tw-border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:tw-border-0", className)}
    {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "tw-border-t tw-bg-slate-100/50 tw-font-medium [&>tr]:last:tw-border-b-0 dark:tw-bg-slate-800/50",
      className
    )}
    {...props} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "tw-border-b tw-transition-colors hover:tw-bg-slate-100/50 data-[state=selected]:tw-bg-slate-100 dark:hover:tw-bg-slate-800/50 dark:data-[state=selected]:tw-bg-slate-800",
      className
    )}
    {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "tw-h-12 tw-px-4 tw-text-left tw-align-middle tw-font-medium tw-text-slate-500 [&:has([role=checkbox])]:tw-pr-0 dark:tw-text-slate-400",
      className
    )}
    {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pr-0", className)}
    {...props} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("tw-mt-4 tw-text-sm tw-text-slate-500 dark:tw-text-slate-400", className)}
    {...props} />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
