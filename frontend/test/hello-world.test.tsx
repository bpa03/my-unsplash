import {render, screen} from '@testing-library/react'

describe('Hello, World component', () => {
  test('should render \'Hello, World\'', () => {
    render(
      <div>
        <h1>Hello, World</h1>
      </div>
    )
    const title = screen.getByText(/hello, world/i)
    expect(title).toBeInTheDocument()
  })
})
