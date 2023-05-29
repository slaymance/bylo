import { useGlobalContext, ProductType } from '../GlobalContext';

export default function ProductPage({ product }: { product: ProductType | null }) {
  const { state, updateState, setRoute } = useGlobalContext();

  return product ? (
    <div className="bg-white">
      <div className="m-0 sm:m-6">
        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 mx-auto max-w-7xl">
          <div className="aspect-h-2 aspect-w-2 overflow-hidden sm:rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-4">
            <img src={product.imageSrc} className="object-cover object-center" />
          </div>
          <div className="m-2 sm:m-6 sm:col-span-8 lg:col-span-7">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

            <section aria-labelledby="information-heading" className="mt-2">
              <h3 id="information-heading" className="sr-only">
                Product information
              </h3>

              <p className="text-2xl tracking-tight text-gray-900">${product.price}</p>

              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse sed nisi lacus sed viverra. Mauris nunc congue nisi vitae suscipit tellus.</p>
                </div>
              </div>

            </section>

            <section aria-labelledby="options-heading" className="mt-10">
              <h3 id="options-heading" className="sr-only">
                Product options
              </h3>

              <form>
                <button
                  type="submit"
                  className="inset-x-0 bottom-0 mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-[#5271ff] px-8 py-3 text-base font-medium text-white hover:[#5271ff] focus:outline-none focus:ring-2 focus:[#5271ff] focus:ring-offset-2"
                  onClick={(e) => {
                    e.preventDefault();

                    if (state.cart.some(({ _id }) => _id === product._id)) {
                      updateState({ cart: state.cart.map((cartProduct) => cartProduct._id === product._id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct) });
                    } else {
                      updateState({ cart: [...state.cart, { ...product, quantity: 1 }] });
                    }

                    setRoute('/');
                  }}
                >
                  Add to bag
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}