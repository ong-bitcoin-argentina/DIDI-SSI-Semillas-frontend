import React, { useEffect } from 'react';
import './_style.scss';
import { Tabs, message } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import CredentialTable from '../CredentialTable/credential-table';
import TabTooltip from '../../atoms/TabTooltip/tab-tooltip';

import { getCredentialsColumns } from '../../../utils/table-definitions';
const { TabPane } = Tabs;

const { getCredentials } = api();

const TabTable = () => {
  const [pagination, setPagination] = useState({
    page: 0
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const [filters, setFilters] = useState({});

  const getCredentialData = useApi();

  const fetchCredentials = () => {
    setLoading(true);
    getCredentialData(getCredentials, { page: pagination.page, ...filters }, onSuccess, onError);
  };

  const credentialsColumns = getCredentialsColumns(fetchCredentials);

  useEffect(() => {
    fetchCredentials();
  }, [pagination.page, filters]);

  const onApplyFilter = filter => {
    setFilters(filter);
  };

  const onSuccess = data => {
    setPagination({
      total: 50,
      page: pagination.page
    });
    setLoading(false);
    setCredentials(data);
  };

  const onError = () => {
    message.error('No se pudieron obtener las credenciales, intente nuevamente.');
    setLoading(false);
  };

  const handleTableChange = pagination => {
    let page = pagination.current;

    setLoading(true);
    setPagination({
      total: 50,
      page: page
    });
  };

  return (
    <div className="TabTableContent">
      <Tabs>
        <TabPane
          tab={<TabTooltip title={'Credenciales en uso'} tooltip={'Credenciales vigentes'} />}
          key={'1'}
        >
          <CredentialTable
            onApplyFilter={onApplyFilter}
            onChange={handleTableChange}
            columns={credentialsColumns}
            dataSource={credentials}
            loading={loading}
            pagination={pagination}
          />
        </TabPane>

        <TabPane
          tab={<TabTooltip title={'Credenciales revocadas'} tooltip={'Credenciales caducadas'} />}
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              title={'Credenciales pendientes'}
              tooltip={'A espera de generación del DID'}
            />
          }
          key="3"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <TabTooltip
              title={'Pendientes BOCS'}
              tooltip={'A espera de aprobación crediticia desde sitema BONDAREA BOCS'}
            />
          }
          key="4"
        >
          Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabTable;
