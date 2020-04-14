import React from 'react';
import { PageHeader } from 'antd';
import itemRender from '../components/BreadcrumbItemRender/BreadcrumbItemRender';

const routes = [
  {
    path: '',
    breadcrumbName: 'home',
  },
  {
    path: 'first',
    breadcrumbName: 'first',
    children: [
      {
        path: '/general',
        breadcrumbName: 'General',
      },
      {
        path: '/layout',
        breadcrumbName: 'Layout',
      },
      {
        path: '/navigation',
        breadcrumbName: 'Navigation',
      },
    ],
  },
  {
    path: 'second',
    breadcrumbName: 'second',
  },
];

const AboutPageHeader = () => {
  return (
    <>
      <PageHeader
        style={{ background: 'white' }}
        className="site-page-header"
        title="Title"
        breadcrumb={{ routes, itemRender }}
        subTitle="This is a subtitle"
      />
    </>
  );
};

export default AboutPageHeader;
