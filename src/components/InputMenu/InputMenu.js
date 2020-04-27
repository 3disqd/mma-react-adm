import React, { useCallback, useMemo, useState } from 'react';
// import styles from './InputMenu.module.css';
import { Tabs } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import TabContent from './TabContent/TabContent';

const { TabPane } = Tabs;

const InputMenu = ({ tags }) => {
  const [activeKey, setActiveKey] = useState('0');
  const [panes, setPanes] = useState([
    {
      title: 'Tab 1',
      products: ['5e89d72866997e2cc01d5ad9', '5e9255eb1e520cec3b8eee1a'],
      content: { text: 'Content of Tab 1' },
    },
    {
      title: 'Tab 2',
      products: [],
      content: { text: 'Content of Tab 2' },
    },
    {
      title: 'Tab 3',
      products: [],
      content: { text: 'Content of Tab 3' },
    },
  ]);

  const add = useCallback(() => {
    setPanes(panes => {
      setActiveKey(panes.length + '');
      return [
        ...panes,
        {
          title: 'new',
          content: 'Content of new Tab',
        },
      ];
    });
  }, []);

  const onEdit = useCallback(
    (targetKey, action) => {
      if (action === 'add') {
        add();
      }
    },
    [add]
  );

  const addProduct = useCallback(key => {
    setPanes(panes =>
      panes.map((pane, num) =>
        num === key ? { ...pane, products: [...pane.products, ''] } : pane
      )
    );
  }, []);

  const setProduct = useCallback((paneNum, productNum, productId) => {
    setPanes(panes =>
      panes.map((pane, num) =>
        paneNum === num
          ? {
              ...pane,
              products: pane.products.map((product, number) =>
                productNum === number ? productId : product
              ),
            }
          : pane
      )
    );
  }, []);

  const removeProduct = useCallback((paneNum, productNum) => {
    setPanes(panes =>
      panes.map((pane, num) =>
        paneNum === num
          ? {
              ...pane,
              products: pane.products.filter(
                (product, number) => number !== productNum
              ),
            }
          : pane
      )
    );
  }, []);

  const moveProduct = useCallback((paneNum, productNum, direction) => {
    setPanes(panes => {
      const shift = direction === 'up' ? -1 : 1;
      let newOrder = [...panes[paneNum].products];
      [newOrder[productNum], newOrder[productNum + shift]] = [
        newOrder[productNum + shift],
        newOrder[productNum],
      ];
      return panes.map((pane, num) =>
        num === paneNum ? { ...pane, products: newOrder } : pane
      );
    });
  }, []);

  const editContent = (key, field) => {
    setPanes(panes =>
      panes.map((pane, num) => (num === key ? { ...pane, ...field } : pane))
    );
  };

  const moveTab = useCallback((key, direction) => {
    const shift = direction === 'left' ? -1 : 1;
    setPanes(panes => {
      let newOrder = [...panes];
      [newOrder[key], newOrder[key + shift]] = [
        newOrder[key + shift],
        newOrder[key],
      ];
      return newOrder;
    });
    setActiveKey(key + shift + '');
  }, []);

  const removeTab = useCallback(key => {
    setPanes(panes => {
      if (key + 1 === panes.length) {
        setActiveKey(panes.length - 2 + '');
      }
      return panes.filter((pane, num) => num !== key);
    });
  }, []);

  const groupsOptions = useMemo(() => tags.map(tag => ({ value: tag })), [
    tags,
  ]);

  const tabPanes = useMemo(
    () =>
      panes.map((pane, num) => (
        <TabPane
          tab={pane.title || <FileAddOutlined />}
          key={num}
          closable={false}
        >
          <TabContent
            {...pane}
            onRemove={() => {
              removeTab(num);
            }}
            onChange={(field, value) => {
              editContent(num, field, value);
            }}
            groups={groupsOptions}
            addProduct={() => {
              addProduct(num);
            }}
            selectProduct={(productNum, productId) => {
              setProduct(num, productNum, productId);
            }}
            removeProduct={productNum => {
              removeProduct(num, productNum);
            }}
            moveProduct={(productNum, direction) => {
              moveProduct(num, productNum, direction);
            }}
            moveTabLeft={
              num === 0
                ? undefined
                : () => {
                    moveTab(num, 'left');
                  }
            }
            moveTabRight={
              num === panes.length - 1
                ? undefined
                : () => {
                    moveTab(num, 'right');
                  }
            }
          />
        </TabPane>
      )),
    [
      panes,
      groupsOptions,
      removeTab,
      moveTab,
      addProduct,
      setProduct,
      removeProduct,
      moveProduct,
    ]
  );

  return (
    <Tabs
      onChange={setActiveKey}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
      animated={true}
    >
      {tabPanes}
    </Tabs>
  );
};

export default InputMenu;
