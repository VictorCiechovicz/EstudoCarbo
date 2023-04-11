import { useEffect } from 'react';
import sipalSource from 'data/sources/sipalSource';
import { TESTE_LAYER_ID } from 'components/layers/TesteLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';

const useStyles = makeStyles(() => ({
  sipal: {},
}));

export default function Sipal() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(sipalSource));

    dispatch(
      addLayer({
        id: TESTE_LAYER_ID,
        source: sipalSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(TESTE_LAYER_ID));
      dispatch(removeSource(sipalSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.sipal}>
      <div>
        <FormulaWidget
          id='totalRevenue'
          title='Total revenue'
          dataSource={sipalSource.id}
          column='revenue'
          operation={AggregationTypes.SUM}
          formatter={currencyFormatter}
        />

        <Divider />

        <CategoryWidget
          id='revenueByStoreType'
          title='Revenue by store type'
          dataSource={sipalSource.id}
          column='storetype'
          operationColumn='revenue'
          operation={AggregationTypes.SUM}
          formatter={currencyFormatter}
        />
      </div>
    </Grid>
  );
}
