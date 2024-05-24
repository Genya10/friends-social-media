import type {Metadata} from 'next';
import { NO_INDEX_PAGE } from '../constants/seo.constants';
import { Auth } from '../components/screens/auth/page';

export const metadata:Metadata ={
    title:'register',
   ...NO_INDEX_PAGE
}

export default function RegisterPage(){
    return(
        <div>
         <Auth type='register'/>
        </div>
    )
}