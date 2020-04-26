import React from 'react';
import api from '../api/v0';
import DadataAddressInput from '../components/DadataAddressInput/DadataAddressInput';

const KekPage = () => {
  return (
    <div>
      qwe
      <button
        onClick={() => {
          api.users.refresh().then(() => {});
        }}
      >
        refresh tokent
      </button>
      <br />
      <DadataAddressInput />
    </div>
  );
};

export default KekPage;
