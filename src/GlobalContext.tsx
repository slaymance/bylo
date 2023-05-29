import React, { useContext, useEffect, useState } from 'react';

const products: ProductType[] = [
  {
    id: 1,
    name: 'Earthen Bottle',
    price: 48,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    price: 35,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    price: 89,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    price: 35,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  },
];

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
}

type ProductCartType = ProductType & { quantity: number; }

type GlobalState = {
  cart: ProductCartType[];
  currentPage: string;
  products: ProductType[];
  selectedProduct: ProductType | null;
  showCart: boolean;
}

type GlobalContextState = {
  state: GlobalState;
  updateState: (newState: Partial<GlobalState>) => void;
  setRoute: (route: string) => void;
}

const GlobalContext = React.createContext<GlobalContextState | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    currentPage: '/',
    products,
    selectedProduct: null,
    showCart: false
  });

  const updateState = (newState: Partial<GlobalState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  }

  const setRoute = (route: string) => {
    setState(prevState => ({ ...prevState, currentPage: route }));
    window.history.pushState(null, '', route);
  }

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ state, updateState, setRoute }}>
      {children}
    </GlobalContext.Provider>
  );
}
