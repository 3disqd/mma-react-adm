import React  from 'react';
import { PageHeader } from 'antd';
// import itemRender from '../components/BreadcrumbItemRender/BreadcrumbItemRender';
// import { OrganizationsContext } from '../contexts/OrganizationsContext';

// const routes = [
//   {
//     globalPath: '/',
//     breadcrumbName: 'home',
//   },
//   {
//     globalPath: '/org/5e7b1ae8e2ddccc0c09386bc/point/1',
//     breadcrumbName: 'Макерони',
//     disabled: true,
//     children: [
//       {
//         globalPath: '/org/5e7b1692a4664bc05834effc/point/1',
//         breadcrumbName: 'Буковски',
//       },
//     ],
//   },
//   {
//     globalPath: '/second',
//     breadcrumbName: 'second',
//     disabled: true,
//     children: [
//       {
//         globalPath: '/org/5e7b1ae8e2ddccc0c09386bc/point/1',
//         breadcrumbName: 'point 1',
//       },
//       {
//         globalPath: '/org/5e7b1ae8e2ddccc0c09386bc/point/2',
//         breadcrumbName: 'point 2',
//       },
//       {
//         globalPath: '/org/5e7b1ae8e2ddccc0c09386bc/point/3',
//         breadcrumbName: 'point 3',
//       },
//     ],
//   },
// ];

const PointPageHeader = () => {
  // const { organizations } = useContext(OrganizationsContext);
  // console.log(props.match.params.orgId);

  return (
    <>
      <PageHeader
        style={{ background: 'white' }}
        className="site-page-header"
        title="Title"
        // breadcrumb={{ routes, itemRender }}
        subTitle="This is a subtitle"
      />
    </>
  );
};

export default PointPageHeader;

