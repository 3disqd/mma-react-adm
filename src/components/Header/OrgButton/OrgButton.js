import React, { useContext } from 'react';
import { Dropdown, Menu } from 'antd';
import { OrganizationsContext } from '../../../contexts/OrganizationsContext';

const OrgButton = ({ className }) => {
  const {
    currentOrganizationId,
    [currentOrganizationId]: currentOrganization,
    organizations,
    // loading,
    selectOrganization,
  } = useContext(OrganizationsContext);

  return (
    <Dropdown
      overlay={
        <Menu>
          {organizations.map(organization => (
            <Menu.Item
              key={organization.id}
              onClick={() => {
                selectOrganization(organization.id);
              }}
            >
              {organization.name}
            </Menu.Item>
          ))}
        </Menu>
      }
      placement="bottomLeft"
    >
      <div className={className}>
        {currentOrganizationId ? currentOrganization.name : 'select org'}
      </div>
    </Dropdown>
  );
};

export default OrgButton;
