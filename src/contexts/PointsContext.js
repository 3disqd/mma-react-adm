import React, { useCallback, useState } from 'react';
import api from '../api/v0';

export const PointsContext = React.createContext({
  pointsByOrg: {},
  loading: false,
  loadPointByOrganizationId: () => {},
});

export const PointsProvider = props => {
  const [loading, setLoading] = useState(false);
  const [pointsByOrg, setPointsByOrg] = useState({});

  const addPointToOrganization = useCallback((id, point) => {
    setLoading(true);
    api.points
      .addPointToOrganization(id, point)
      .then(res => {
        console.log(res);
        setPointsByOrg(pointsByOrg => ({
          ...pointsByOrg,
          [id]: [res.data, ...pointsByOrg[id]],
        }));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const loadPointByOrganizationId = useCallback(id => {
    setLoading(true);
    api.points
      .getByOrganizationId(id)
      .then(res => {
        setPointsByOrg(pointsByOrg => ({
          ...pointsByOrg,
          [id]: res.data.reverse(),
        }));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const updatePoint = useCallback((id, options) => {
    const { name, address, groups, schedule } = options;
    //TODO почистить от неизмененных значений; а может и не надо
    const update = {
      name,
      address,
      groups,
      schedule,
    };
    console.log(update);
    setLoading(true);
    api.points
      .updatePoint(id, update)
      .then(res => {
        // setPointsByOrg('fuck')
        setPointsByOrg(pointsByOrg => {
          const newData = [...pointsByOrg[res.data.organizationId]];
          const index = newData.findIndex(item => res.data.id === item.id);
          newData.splice(index, 1, res.data);
          return { ...pointsByOrg, [res.data.organizationId]: newData };
        });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <PointsContext.Provider
      value={{
        ...pointsByOrg,
        loading,
        loadPointByOrganizationId,
        addPointToOrganization,
        updatePoint,
      }}
    >
      {props.children}
    </PointsContext.Provider>
  );
};
