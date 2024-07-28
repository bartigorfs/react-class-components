import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SearchCard from '@components/SearchCard/SearchCard'
import { useFetchProductsQuery, useGetElementInfoQuery } from '@store/slices/products.slice'
import React from 'react'
import Card from '@components/Card/Card.tsx'
import { ProductTest } from '../../../tests/mockData.ts'

// Мокаем хук useGetElementInfoQuery
vi.mock('@store/slices/products.slice', () => ({
  useGetElementInfoQuery: vi.fn(),
}))

vi.mock('@components/Loader/Loader.tsx', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}))

vi.mock('@components/Card/Card.tsx', () => ({
  __esModule: true,
  default: () => <Card {...ProductTest} />,
}))

describe('SearchCard', () => {
  it('should show loader when data is loading', () => {
    ;(useGetElementInfoQuery as vi.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    })

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path='/details/:detailId' element={<SearchCard />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // it('should display the card when data is loaded', () => {
  //   (useGetElementInfoQuery as vi.Mock).mockImplementation(( number ) => ({
  //     data: { id: 1, ...ProductTest },
  //     error: null,
  //     isLoading: false,
  //   }))
  //
  //   render(
  //     <MemoryRouter initialEntries={['/details/1']}>
  //       <Routes>
  //         <Route path="/details/:detailId" element={<SearchCard />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //
  //   expect(screen.getByText('Card Content')).toBeInTheDocument();
  //   expect(screen.getByText('Close')).toBeInTheDocument();
  // });

  // it('should navigate away when close button is clicked', () => {
  //   (useGetElementInfoQuery as vi.Mock).mockReturnValue({
  //     data: { id: 1, ...ProductTest },
  //     error: null,
  //     isLoading: false,
  //   });
  //
  //   const navigate = vi.fn();
  //
  //   render(
  //     <MemoryRouter initialEntries={['/details/1']}>
  //       <Routes>
  //         <Route path="/details/:detailId" element={<SearchCard />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //
  //   // Проверяем, что кнопка "Close" работает
  //   fireEvent.click(screen.getByText('Close'));
  //   expect(navigate).toHaveBeenCalledWith('/details/1');
  // });
})
