import ProductCard from './ProductCard';
import { useGlobalContext, ProductType } from '../GlobalContext';

export default function ProductList() {
  const { products, updateState, setRoute } = useGlobalContext();

  const handleProductClick = (product: ProductType) => {
    updateState({ selectedProduct: product });
    setRoute(`/product?id=${product._id}`);
  };

  if (!products.length) return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid gap-4 place-content-center h-48 ">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: ProductType) => (
            <ProductCard key={product.name} handleClick={handleProductClick} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

