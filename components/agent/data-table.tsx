"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AgentDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function AgentDataTable<T extends Record<string, any>>({
  columns,
  data,
}: AgentDataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key as string}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-[#3A3C40] py-8">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key as string}>
                    {column.render
                      ? column.render(row)
                      : (row[column.key as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

