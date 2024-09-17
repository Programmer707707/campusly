import { fetchAdminProductDetails, updateProductAction, updateProductImageAction } from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { SubmitButton } from '@/components/form/Buttons';
import CheckboxInput from '@/components/form/CheckboxInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';


async function EditProductPage({params}:{params: {id: string}}){
  const {id} = params;
  const product = await fetchAdminProductDetails(id);
  const {name, company, description, featured, price} = product;
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Update Product</h1>
      <div className='border p-8 rounded'>
        {/* Updating a new image and deleting the old one */}
        <ImageInputContainer action={updateProductImageAction} name={name} image={product.image} text='update image'>
          {/* This one is for new */}
          <input type="hidden" name='id' value={id} />
          {/* This one is for the old image */}
          <input type="hidden" name='url' value={product.image} /> 
        </ImageInputContainer>


        <FormContainer action={updateProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type="hidden" name='id' value={id} />
            <FormInput type='text' name='name' label='product name' defaultValue={name} />
            <FormInput type='text' name='company' defaultValue={company} />
            <PriceInput defaultValue={price} />
          </div>

          <TextAreaInput name='description' labelText='product description' defaultValue={description} />
          <div className='mt-6'>
            <CheckboxInput name='featured' defaultChecked={featured} label='featured' />
          </div>
          <SubmitButton text='update product' className='mt-8 capitalize'/>
        </FormContainer>
      </div>

    </section>
  )
}

export default EditProductPage