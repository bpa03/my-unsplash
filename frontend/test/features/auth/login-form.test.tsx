import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/features/auth/components/login-form'

const defaultProps = {
  loading: false,
  onSubmit: () => {}
}

describe('Login Form component', () => {
  test('Should render form', () => {
    render(<LoginForm {...defaultProps} />)
    
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toBeInTheDocument()
    
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toBeInTheDocument()

    const submitButton = screen.getByRole('button', {name: /login/i})
    expect(submitButton).toBeInTheDocument()
  })
  test('Should validate inputs and show error validations messages', async () => {
    render(<LoginForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', {name: /login/i})
    await userEvent.click(submitButton)

    const emailErrorMessage = screen.getByText(/email is required/i)
    expect(emailErrorMessage).toBeInTheDocument()

    const passwordErrorMessage = screen.getByText(/password is required/i)
    expect(passwordErrorMessage).toBeInTheDocument()
  })
  test('Submit button should be disabled if the load is pending', () => {
    render(<LoginForm {...defaultProps} loading />)

    const submitButton = screen.getByRole('button', {name: /login/i})
    expect(submitButton).toHaveAttribute('aria-disabled', 'true')
  })
  test('onSubmit callback event should be called', async () => {
    const handleSubmit = jest.fn()
    const emailValue = 'bpa@gmail.com'
    const passwordValue = '12345678'

    render(<LoginForm {...defaultProps} onSubmit={handleSubmit} />)
    await userEvent.type(screen.getByLabelText('Email'), emailValue)
    await userEvent.type(screen.getByLabelText('Password'), passwordValue)
    await userEvent.click(screen.getByRole('button', {name: /login/i}))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({email: emailValue, password: passwordValue})
  })
  test('Should validate that que given email is valid', async () => {
    render(<LoginForm {...defaultProps} />)
    const wrongEmail = 'ffkjfkljf.com'
    const passwordValue = '12345678'

    await userEvent.type(screen.getByLabelText('Email'), wrongEmail)
    await userEvent.type(screen.getByLabelText('Password'), passwordValue)
    await userEvent.click(screen.getByRole('button', {name: /login/i}))

    expect(screen.getByText('Email provided is invalid')).toBeInTheDocument()
  })
})