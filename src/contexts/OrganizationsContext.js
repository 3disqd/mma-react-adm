import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../api/v0';
import { find } from 'lodash';
import tokensService from '../TokensService';

export const OrganizationsContext = React.createContext({
  currentOrganizationId: '',
  organizations: [],
  loading: true,
  getOrganizations: () => {},
  addOrganization: () => {},
  updateOrganization: () => {},
  addProductToOrganizationById: () => {},
  updateProduct: () => {},
  selectOrganization: () => {},
});

export const OrganizationsProvider = props => {
  const [loading, setLoading] = useState(false);

  const [organizations, setOrganizations] = useState([]);

  const [currentOrganizationId, setCurrentOrganizationId] = useState('');

  const selectOrganization = useCallback(id => {
    setCurrentOrganizationId(id);
  }, []);

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

  const addOrganization = useCallback(organization => {
    setLoading(true);
    api.organizations
      .create(organization.name)
      .then(res => {
        setOrganizations(organizations => [
          {
            ...res.data,
          },
          ...organizations,
        ]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const updateOrganization = useCallback((id, row) => {
    const update = {
      ...(row.name && { name: row.name }),
      ...(row.kek && { kek: row.kek }),
    };
    setLoading(true);
    api.organizations
      .update(id, update)
      .then(res => {
        setOrganizations(organizations => {
          return organizations.map(organization =>
            res.data.id === organization.id ? res.data : organization
          );
        });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
    if (tokensService.getAccessToken()) {
      getOrganizations();
    }
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
        currentOrganizationId,
        organizations,
        loading,
        getOrganizations,
        addOrganization,
        updateOrganization,
        addProductToOrganizationById,
        updateProduct,
        selectOrganization,
      }}
    >
      {props.children}
    </OrganizationsContext.Provider>
  );
};
