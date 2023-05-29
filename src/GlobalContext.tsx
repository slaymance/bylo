import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import React, { useContext, useEffect, useState } from 'react';

const getProducts = gql`
  query GetProducts {
    products {
      data {
        _id
        name
        imageSrc
        price
      }
    }
  }
`;

export type ProductType = {
  _id: number;
  name: string;
  price: number;
  imageSrc: string;
}

type ProductCartType = ProductType & { quantity: number; }

type GlobalState = {
  cart: ProductCartType[];
  currentPage: string;
  selectedProduct: ProductType | null;
  showCart: boolean;
}

type GlobalContextState = {
  state: GlobalState;
  products: ProductType[];
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
  const { data } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const response = await fetch(`/.netlify/functions/faunaQuery?query=${getProducts}`);
      if (!response.ok) {
        throw new Error('Network request failed.');
      }
      return response.json();
    },
  });

  const [state, setState] = useState<GlobalState>({
    cart: [],
    currentPage: '/',
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
    <GlobalContext.Provider value={{ state, products: data?.products.data ?? [], updateState, setRoute }}>
      {children}
    </GlobalContext.Provider>
  );
}
