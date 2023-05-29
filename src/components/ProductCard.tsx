import { ProductType } from '../GlobalContext';

export default function ProductCard({ handleClick, product }: { handleClick: (product: ProductType) => void, product: ProductType }) {
  return (
    <div className="hover:cursor-pointer" onClick={() => handleClick(product)}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.imageSrc}
          className="h-full w-full object-cover object-center hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price % 1 ? product.price.toFixed(2) : product.price}</p>
    </div>
  );
}
