import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CartDetail() {
  return (
    <section className="w-3/4 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Cart</h1>

      <Table>
        <TableCaption>A list of your cart items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">iPhone 15</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$999.00</TableCell>
            <TableCell className="text-right">$999.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">AirPods Pro</TableCell>
            <TableCell>2</TableCell>
            <TableCell>$249.00</TableCell>
            <TableCell className="text-right">$498.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
