import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/country-my-suffix">
      <Translate contentKey="global.menu.entities.countryMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/province-my-suffix">
      <Translate contentKey="global.menu.entities.provinceMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/city-my-suffix">
      <Translate contentKey="global.menu.entities.cityMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/visitor-my-suffix">
      <Translate contentKey="global.menu.entities.visitorMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/otp-history-my-suffix">
      <Translate contentKey="global.menu.entities.otpHistoryMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/serial-generator-my-suffix">
      <Translate contentKey="global.menu.entities.serialGeneratorMySuffix" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
