import ProductCard from './ProductCard';
import { useGlobalContext } from '../GlobalContext';

export default function ProductList() {
  const { state, updateState, setRoute } = useGlobalContext() as any;

  const handleProductClick = (product: any) => {
    updateState({ selectedProduct: product });
    setRoute(`/product?id=${product.id}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {state.products.map((product: any) => (
            <ProductCard key={product.id} handleClick={handleProductClick} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}

