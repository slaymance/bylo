import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType, useGlobalContext } from '../GlobalContext';

const addProductMutation = gql`
  mutation AddProduct($name: String!, $price: Float!) {
    createProduct(data: { name: $name, price: $price }) {
      _id
      name
      price
    }
  }
`;

export default function AddProductPage() {
  const { setRoute } = useGlobalContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newProduct: Pick<ProductType, 'name' | 'price'>) => {
      const response = await fetch(`/.netlify/functions/faunaQuery?query=${addProductMutation}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variables: newProduct,
        })
      });

      if (!response.ok) {
        throw new Error('Network request failed.');
      }

      const { data } = response.json() as unknown as { data: ProductType };
      return data;
    },
    onMutate: async (newProduct: Pick<ProductType, 'name' | 'price'>) => {
      await queryClient.cancelQueries({ queryKey: ['getProducts'] });

      const previousProducts = queryClient.getQueryData(['getProducts']) as ProductType[];
      queryClient.setQueryData<any>(['getProducts'], ({ products: { data: oldProducts } }: { products: { data: ProductType[] } }) => ({ products: { data: [...oldProducts, newProduct] } }));

      return { previousProducts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['getProducts'], context?.previousProducts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      setRoute('/');
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct: Pick<ProductType, 'name' | 'price'> = {
      name: formData.get('productName') as string,
      price: Number(formData.get('productPrice')) as number
    };
    mutation.mutate(newProduct);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className="grid grid-flow-row gap-x-6 gap-y-10 xl:gap-x-8">
          <form onSubmit={onSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-10">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5271ff] sm:text-sm sm:leading-6 p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="productPrice" className="block text-sm font-medium leading-6 text-gray-900">
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        id="productPrice"
                        name="productPrice"
                        type="number"
                        step="0.01"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5271ff]sm:text-sm sm:leading-6 p-2"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => setRoute('/')}>
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#5271ff] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5271ff]"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
