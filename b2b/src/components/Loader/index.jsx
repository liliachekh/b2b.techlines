import { Oval } from 'react-loader-spinner';
import styles from './loader.module.scss';

export default function Loader(){
  return(
    <div className={styles.loader}>
        <Oval
          height={80}
          width={80}
          color="black"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="gray"
          strokeWidth={2}
          strokeWidthSecondary={2}/>
    </div>
  );
}