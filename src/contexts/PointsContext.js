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

  return (
    <PointsContext.Provider
      value={{
        ...pointsByOrg,
        loading,
        loadPointByOrganizationId,
        addPointToOrganization,
      }}
    >
      {props.children}
    </PointsContext.Provider>
  );
};
