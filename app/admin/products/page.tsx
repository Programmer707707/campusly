import EmptyList from '@/components/global/EmptyList';
import { deleteProductAction,fetchUserProducts } from '@/utils/actions';
import Link from 'next/link';

import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IconButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';

async function ProductsPage() {
  const items = await fetchUserProducts();
  if (items.length === 0) return <EmptyList />;
  return (
    <section>
      <Table>
        <TableCaption className='capitalize'>
          total products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className='underline text-muted-foreground tracking-wide capitalize'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/admin/products/${productId}/edit`}><IconButton actionType='edit'/></Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function DeleteProduct({productId}:{productId: string}){
  const deleteProduct = deleteProductAction.bind(null, {productId});
  //And in the above line why i am giving null as a param for the bind. The bind creates new function
  //that is prefilled with productId and the null is given instead of "this". Because we cannot use 
  // "this" context here, that is why I gave null.
  return <FormContainer action={deleteProduct}>
    <IconButton actionType='delete' />
  </FormContainer>
}

export default ProductsPage;