import { AuthModule } from '@/app/modules'
import { type FC } from 'react'

// interface
interface IProps {}

// component
const LoginPage: FC<Readonly<IProps>> = async (props) => {
  // return
  return <AuthModule type='login' />
}

export default LoginPage
