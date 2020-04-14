import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../api/v0';
import { find } from 'lodash';

export const OrganizationsContext = React.createContext({
  organizations: [],
  loading: true,
  getOrganizations: () => {},
  addOrganization: () => {},
  updateOrganization: () => {},
  addProductToOrganizationById: () => {},
  updateProduct: () => {},
});

export const OrganizationsProvider = props => {
  const [loading, setLoading] = useState(true);

  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = useCallback(() => {
    setLoading(true);
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
    const update = {
      ...(row.name && { name: row.name }),
      ...(row.kek && { kek: row.kek }),
    };
    setLoading(true);
    api.organizations
      .update(id, update)
      .then(res => {
        const newData = [...organizations];
        const index = newData.findIndex(item => res.data.id === item.id);
        newData.splice(index, 1, res.data);
        setOrganizations(newData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  //TODO завернуть фнкции в колбеки

  //TODO вынести продукты в свой контекст? ПОДУМАТЬ!

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
        const newOrganizationsData = [...organizations];
        let updatedOrganization = find(newOrganizationsData, {
          id: organizationId,
        });
        updatedOrganization.products = res.data;
        console.log(newOrganizationsData);
        setOrganizations(newOrganizationsData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateProduct = useCallback((organizationId, productId, product) => {
    setLoading(true);

    api.products
      .update(organizationId, productId, product)
      .then(res => {
        setOrganizations(organizations =>
          organizations.map(organization =>
            organization.id === organizationId
              ? { ...organization, products: res.data }
              : organization
          )
        );
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getOrganizations();
  }, [getOrganizations]);

  const organizationsById = useMemo(() => {
    let res = {};
    for (let i = 0; i < organizations.length; i++) {
      res[organizations[i].id] = organizations[i];
    }
    return res;
  }, [organizations]);

  return (
    <OrganizationsContext.Provider
      value={{
        ...organizationsById,
        organizations,
        loading,
        getOrganizations,
        addOrganization,
        updateOrganization,
        addProductToOrganizationById,
        updateProduct,
      }}
    >
      {props.children}
    </OrganizationsContext.Provider>
  );
};
