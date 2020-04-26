import React, { useEffect, useState } from 'react';
import styles from './DadataAddressInput.module.css';
import { AutoComplete } from 'antd';
import dadata from '../../api/dadata';
import { useDebounce } from '../../hooks/useDebounce';

const DadataAddressInput = () => {
  const [value, setValue] = useState('г Екатеринбург, ул Народной воли,');
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('г Екатеринбург, ул Народной воли,');
  const [data, setData] = useState({});

  const debouncedSearchTerm = useDebounce(search, 200);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dadata.suggest.address(debouncedSearchTerm).then(res => {
        setOptions(res.data.suggestions);
      });
    } else {
      setOptions([]);
    }
  }, [debouncedSearchTerm]);

  const onSelect = (value, suggestion) => {
    setData(suggestion.data);
  };

  const onChange = data => {
    setValue(data);
  };

  return (
    <div className={styles.wrapper}>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 600 }}
        onSelect={onSelect}
        onSearch={setSearch}
        onChange={onChange}
        placeholder="control mode"
        className={styles.input}
      />
      <div className={styles.preview}>
        <div className={styles.item}>{`Город : ${data.city}`}</div>
        <div className={styles.item}>{`Улица : ${data.street_with_type}`}</div>
        <div
          className={styles.item}
        >{`${data.house_type_full} : ${data.house}`}</div>
        <div className={styles.item}>
          Координаты :{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://maps.yandex.ru/?text=${data.geo_lat},${data.geo_lon}`}
          >
            {data.geo_lat},{data.geo_lon}
          </a>
        </div>

        {/*<div> :</div>*/}
        {/*<div>Координаты :</div>*/}
        {/*<p>{}</p>*/}
        {/*<p>{data.street_with_type}</p>*/}
        {/*<p>{data.house_type_full}</p>*/}
        {/*<p>{data.house}</p>*/}
        {/*<p>{data.city_fias_id}</p>*/}
        {/*<p>{data.city_kladr_id}</p>*/}
        {/*<p>{data.geo_lat}</p>*/}
        {/*<p>{data.geo_lon}</p>*/}
      </div>
    </div>
  );
};

export default DadataAddressInput;
