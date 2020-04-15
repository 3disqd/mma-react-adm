import React from 'react';
import api from '../api/v0';
// import Fingerprint2 from 'fingerprintjs2';

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
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    // Fingerprintjs2.get(() => {*/}
      {/*    // }, )*/}
      {/*    const options = {*/}
      {/*      excludes: {*/}
      {/*        colorDepth: true,*/}
      {/*        screenResolution: true,*/}
      {/*        availableScreenResolution: true,*/}
      {/*        pixelRatio: true,*/}
      {/*        plugins: true,*/}
      {/*      },*/}
      {/*    };*/}
      {/*    Fingerprint2.get(options, function(components) {*/}
      {/*      const values = components.map(function(component) {*/}
      {/*        console.log(component);*/}
      {/*        return component.value;*/}
      {/*      });*/}
      {/*      // console.log(values.join(''));*/}
      {/*      const murmur = Fingerprint2.x64hash128(values.join(''), 31);*/}
      {/*      // Fingerprint2.*/}
      {/*      console.log(murmur);*/}
      {/*    });*/}
      {/*    // Fingerprintjs2.get(function(components) {*/}
      {/*    //   console.log(components); // an array of components: {key: ..., value: ...}*/}
      {/*    //   console.log(JSON.stringify(components));*/}
      {/*    // });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  fingerprint*/}
      {/*</button>*/}
    </div>
  );
};

export default KekPage;
