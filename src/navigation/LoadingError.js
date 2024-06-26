import { Button, Icon, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectCustomBuild } from '../redux/App/selectors';
import Server from './account/components/Server';

export default function LoadingError() {
  const customBuild = useSelector(selectCustomBuild);

  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon as={Ionicons} name="warning" />
      <Text
        style={{
          marginBottom: 10,
        }}>
        {t('NET_FAILED')}
      </Text>
      <Button block onPress={() => this.load()}>
        <Text>{t('RETRY')}</Text>
      </Button>
      <View style={{ marginVertical: 20 }}>
        {customBuild ? null : <Server />}
      </View>
    </View>
  );
}
