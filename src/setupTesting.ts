import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { createRoot } from 'react-dom/client'

vi.stubGlobal('createRoot', createRoot)
