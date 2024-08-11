import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Card from './Card'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '@store/reducers/root.reducer.ts'
import { BrowserRouter } from 'react-router-dom'
import { Product } from '@api/api.models.ts'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  }
})

const store = createStore(rootReducer)

describe('Card Component', () => {
  const defaultProps = {
    id: 1,
    images: ['https://via.placeholder.com/150'],
    thumbnail: 'https://via.placeholder.com/150',
    title: 'Test Title',
    description: 'Test Description',
    bottomElement: <div>Bottom Element</div>,
    topElement: <div>Top Element</div>,
    ignoreCardClick: false,
  }

  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card product={defaultProps as Product} {...props} />
        </BrowserRouter>
      </Provider>,
    )

  it('renders the Card component with title and description', () => {
    renderComponent()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('displays the image when provided', () => {
    renderComponent()
    const image = screen.getByAltText('Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150')
  })

  it('renders the placeholder image when no images are provided', () => {
    renderComponent({ images: undefined })
    const image = screen.getByAltText('Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150') // Adjust this path if necessary
  })
})
