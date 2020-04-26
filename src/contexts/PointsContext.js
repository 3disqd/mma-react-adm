import React, { useCallback, useMemo, useState } from 'react';
import api from '../api/v0';
import unionBy from 'lodash/unionBy';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import uniq from 'lodash/uniq';

export const PointsContext = React.createContext({
  loading: false,
  loadPointByOrganizationId: () => {},
});

export const PointsProvider = props => {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState([]);

  const addPointToOrganization = useCallback((id, point) => {
    setLoading(true);
    api.points
      .addPointToOrganization(id, point)
      .then(res => {
        setPoints(points => [res.data, ...points]);
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
        setPoints(points => unionBy(points, res.data.reverse(), 'id'));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const loadPointById = useCallback(id => {
    setLoading(true);
    api.points.getById(id).then(res => {
      setPoints(points => [...points, res.data]);
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
        console.log(res.data);
        setPoints(points =>
          points.map(point => (point.id === res.data.id ? res.data : point))
        );
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //монга не гарантирует уникальность ид в разных коллекциях
  const pointsByOrgId = useMemo(
    () =>
      mapKeys(groupBy(points, 'organizationId'), (val, key) => key + '_points'),
    [points]
  );

  //TODO чет нечитабельно получилось; мб зачейнить
  const productTagsByOrgId = useMemo(
    () =>
      mapValues(
        mapKeys(groupBy(points, 'organizationId'), (val, key) => key + '_tags'),
        points =>
          uniq(points.reduce((total, point) => [...total, ...point.groups], []))
      ),
    [points]
  );

  const pointsById = useMemo(() => keyBy(points, 'id'), [points]);

  return (
    <PointsContext.Provider
      value={{
        ...pointsById,
        ...pointsByOrgId,
        ...productTagsByOrgId,
        loading,
        loadPointById,
        loadPointByOrganizationId,
        addPointToOrganization,
        updatePoint,
      }}
    >
      {props.children}
    </PointsContext.Provider>
  );
};
