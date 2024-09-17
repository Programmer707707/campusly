import { Label } from '../ui/label';
import { Input } from '../ui/input';

const name = 'price'; //Here I just hardcoded the price name and i can use it everywhere in my component
type FormInputNumberProps = {
  defaultValue?: number;
};


const PriceInput = ({defaultValue}: FormInputNumberProps) => {
  
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>Price ($)</Label>
      <Input id={name} type='number' name={name} min={0} defaultValue={defaultValue || 30} required />
    </div>
  )
}

export default PriceInput;

//The reason why I decided to create new component for the price instead of using existing formInput
//because there are some specific values that are belong to priceInput and I think giving a lot of 
//props to one component in a different context will make our component meaningless.