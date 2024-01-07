import { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Breadcrumb.css'
import { Link } from 'react-router-dom';
import React from 'react';


interface Props {
  items: { label: string; link: string }[];
  className?: string;
}


const Breadcrumbs: FC<Props> = ({items, className}) => {

  return (
    <div className={`breadcrumbs ${className || ''}`}>
        {items.map((item, index) => (
        <React.Fragment key={item.link}>
          {index > 0 && <span className="breadcrumb-separator"> / </span>}
          <Link to={item.link} className="breadcrumb-link">
            {item.label}
          </Link>
        </React.Fragment>
      ))}
        
    </div>
  );
}

export default Breadcrumbs;

