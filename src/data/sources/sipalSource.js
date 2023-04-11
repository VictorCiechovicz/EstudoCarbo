import { MAP_TYPES } from '@deck.gl/carto';

const SIPAL_SOURCE_ID = 'sipalSource';

const source = {
  id: SIPAL_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `cartobq.public_account.retail_stores`,
};

export default source;
