import React, {memo, useCallback, useRef} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {Animated, Alert} from 'react-native';
import {syncDeleteCameras, useCamera} from '@/store/camera';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {DetailHeader} from '@/components/DetailHeader';
import {Banners} from '@/screens/Detail/Banners';
import {Item, ItemContent, OnOffItem} from '@/components';
import {goBack, openAddCameraScreen} from '@/utils/navigation';

const Container = styled(Animated.ScrollView)`
  flex: 1;
  background-color: ${Colors.white};
`;

const WrapContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const ContentContainer = styled.View`
  width: 100%;
  padding: 0 16px 16px 16px;
  background-color: ${Colors.white};
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.gray1};
  font-weight: bold;
  padding-top: 12px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  color: ${Colors.gray1};
  padding-top: 4px;
`;

const TitleDeleteCamera = styled.Text`
  color: #ffffff;
  text-align: center;
`;
const BtnDeleteCamera = styled.TouchableOpacity`
  margin: 20px;
  padding: 10px;
  height: 40px;
  background-color: #ff4a4a;
  border-radius: 4px;
  align-self: center;
  justify-content: center;
`;

export interface DetailScreenProps {
  id: string;
}

export const DetailScreen = memo(function HomeScreen() {
  const {id} = useNavigationParams<DetailScreenProps>();
  const newScrollY = useRef(new Animated.Value(0)).current;

  const scale: any = newScrollY.interpolate({
    inputRange: [-300, 0],
    outputRange: [4, 1],
    extrapolateRight: 'clamp',
  });

  const deleteCamera = useCallback(() => {
    syncDeleteCameras(id);
    goBack();
  }, []);
  const showAlertDelete = () => {
    Alert.alert(
      'Delete Camera ?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteCamera(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <DetailHeader id={id} />
      <Container
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: newScrollY}}}],
          {useNativeDriver: true},
        )}>
        <Animated.View style={{transform: [{scale}]}}>
          <Banners productId={id} />
        </Animated.View>
        {/*<BgImage resizeMode={'cover'} source={{uri: Core.baseUrl + product?.imageFeature || ''}}/>*/}
        <WrapContainer>
          <ContentContainer>
            <Title>Camera s??? 02</Title>
          </ContentContainer>
          <Item label={'ID c???a kh??ch h??ng'} divider={true}>
            <ItemContent>{10}</ItemContent>
          </Item>
          <Item label={'V??? tr?? l???p ?????t'} divider={true}>
            <ItemContent>{'H??nh lang'}</ItemContent>
          </Item>
          <Item label={'Ng?????ng ????a ra c???nh b??o h??nh ?????ng ng??'} divider={true}>
            <ItemContent>{95}</ItemContent>
          </Item>
          <Item
            label={'Ng?????ng ????a ra c???nh b??o h??nh ?????ng ????nh nhau'}
            divider={true}>
            <ItemContent>{95}</ItemContent>
          </Item>
          <Item
            label={'Ng?????ng ????a ra c???nh b??o h??nh ?????ng say x???n'}
            divider={true}>
            <ItemContent>{95}</ItemContent>
          </Item>
          <Item label={'Gi?? tr??? v??? ????? nh???y c???a h??nh ?????ng ng??'} divider={true}>
            <ItemContent>{7}</ItemContent>
          </Item>
          <Item
            label={'Gi?? tr??? v??? ????? nh???y c???a h??nh ?????ng ????nh nhau'}
            divider={true}>
            <ItemContent>{4}</ItemContent>
          </Item>
          <Item
            label={'Gi?? tr??? v??? ????? nh???y c???a h??nh ?????ng say x???n'}
            divider={true}>
            <ItemContent>{4}</ItemContent>
          </Item>
          <Item
            label={'T??nh n??ng c???nh b??o khi l???ng v???ng t???i ch???'}
            divider={true}>
            <OnOffItem active={true} />
          </Item>

          <Item
            label={
              'Ng?????ng th???i gian ????a ra c???nh b??o khi c?? ng?????i l???ng v???ng t???i ch???'
            }
            divider={true}>
            <ItemContent>{60}</ItemContent>
          </Item>
          <BtnDeleteCamera onPress={showAlertDelete}>
            <TitleDeleteCamera>Delete Camera</TitleDeleteCamera>
          </BtnDeleteCamera>
        </WrapContainer>
      </Container>
    </>
  );
});
