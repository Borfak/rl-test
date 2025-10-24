import { AuthModule } from '@/app/modules'
import { type FC } from 'react'

// interface
interface IProps {}

// component
const RegisterPage: FC<Readonly<IProps>> = async (props) => {
  // return
  return <AuthModule type='register' />
}

export default RegisterPage
