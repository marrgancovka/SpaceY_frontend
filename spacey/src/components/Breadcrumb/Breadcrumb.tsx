import { FC, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb } from 'react-bootstrap';
import './Breadcrumb.css'

interface Props{
  title: string
}

const Breadcrumbs: FC<Props> = (props) => {

  // const [title, setTitle] = useEffect

  return (
    <Breadcrumb className='mybread'>
      <Breadcrumb.Item href="/starships" className='myitem'>Корабли</Breadcrumb.Item>
      <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default Breadcrumbs;

