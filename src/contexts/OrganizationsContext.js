import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/v0';
import { find } from 'lodash';

export const OrganizationsContext = React.createContext({
  organizations: [],
  loading: true,
  getOrganizations: () => {},
  addOrganization: () => {},
  updateOrganization: () => {},
  addProductToOrganizationById: () => {},
});

export const OrganizationsProvider = props => {
  const [loading, setLoading] = useState(true);

  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = useCallback(() => {
    api.organizations
      .getAll()
      .then(res => {
        // console.log(res);
        setOrganizations(
          res.data
            .map(organization => ({
              ...organization,
            }))
            .reverse()
        );
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const addOrganization = organization => {
    setLoading(true);
    api.organizations
      .create(organization.name)
      .then(res => {
        const newData = [
          {
            ...res.data,
          },
          ...organizations,
        ];
        setOrganizations(newData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateOrganization = (id, row) => {
    console.log(id, row);
    const update = {
      ...(row.name && { name: row.name }),
      ...(row.kek && { kek: row.kek }),
    };
    setLoading(true);
    api.organizations
      .update(id, update)
      .then(res => {
        const newData = [...organizations];
        const index = newData.findIndex(item => res.data._id === item._id);
        newData.splice(index, 1, res.data);
        setOrganizations(newData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const addProductToOrganizationById = (organizationId, product) => {
    setLoading(true);
    //TODO не отправлять пустые поля: использовать lodash/ забить хуй

    const newProduct = {
      ...(product.name && { name: product.name }),
      ...(product.price && { price: product.price }),
      ...(product.description && { description: product.description }),
    };
    api.products
      .create(organizationId, newProduct)
      .then(res => {
        const newData = [...organizations];
        let updatedOrganization = find(newData, { _id: organizationId });
        updatedOrganization.products = res.data;
        setOrganizations(newData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrganizations();
  }, [getOrganizations]);

  return (
    <OrganizationsContext.Provider
      value={{
        organizations,
        loading,
        getOrganizations,
        addOrganization,
        updateOrganization,
        addProductToOrganizationById,
      }}
    >
      {props.children}
    </OrganizationsContext.Provider>
  );
};
