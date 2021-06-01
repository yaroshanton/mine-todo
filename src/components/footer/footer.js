import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';

const FILTERS_BTN = [
  {
    text: 'Все',
    id: 'all',
  },
  {
    text: 'Активные',
    id: 'active',
  },
  {
    text: 'Готовые',
    id: 'completed'
  }
];

const Footer = ({ activeFilter, changeFilter }) => (
  <div className="footer">
    <div className="btn-group">
      {FILTERS_BTN.map(({ text, id }) => (
        <button
          onClick={() => { changeFilter(id); }}
          key={id}
          className={id === activeFilter ? "filter-btn active" : 'filter-btn'}
        >{text}</button>
      ))}
    </div>
  </div>
);

Footer.propTypes = {
  activeFilter: PropTypes.string,
  changeFilter: PropTypes.func,
};

Footer.defaultProps = {
  activeFilter: 'all',
};

export default Footer;
