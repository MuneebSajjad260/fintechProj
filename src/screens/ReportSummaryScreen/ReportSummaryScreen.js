import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {AppTheme} from '../../shared/theme';
import styles from './ReportSummaryScreen.Style';
import uuid from 'react-native-uuid';
import ImageView from 'react-native-image-viewing';
import moment from 'moment';
import Frame from '../../shared/components/core/Frame';
import Txt from '../../shared/components/core/Txt';
import {GiftedChat} from 'react-native-gifted-chat';
import GiftedChatInput from '../../shared/components/GiftedChatModules/CustomInput';
import RenderBubble from '../../shared/components/GiftedChatModules/RenderBubble';
import {useDispatch, useSelector} from 'react-redux';
import {GetChatList} from '../../shared/redux/action/GetChatList';
import {selectUserData} from '../../shared/redux/slices/isadminSlice';
import {SendMessage} from '../../shared/redux/action/SendMessage';
import HelpDeskIcon from '../../assets/images/HeadPhoneIcon.js';

export default function ReportSummaryScreen({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [ImagePath, setImagePath] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const {Id: ownId} = useSelector(selectUserData) || null;
  const loginData = useSelector(state => state.auth?.data);
  const token = loginData?.access_token;
  const dispatch = useDispatch();

  const {Subject, CreatedOn, Closed, MessageText, Id: prId} = route.params.item;
  const isMessagesAppendedRef = useRef(false);
  const isDarkMode = useSelector(state => state.mode.colorScheme);

  // *API Modules
  // *Get Chat List
  const getChatListApi = async () => {
    if (!prId) {
      console.log('Please Provide a Valid ID to Proceed!');
      return;
    }
    try {
      setIsLoading(true);
      const response = await dispatch(GetChatList(prId)).unwrap();
      console.log('API Response: ', response);
      setIsLoading(false);

      if (response.data && response.data.length > 0) {
        const newMessages = response.data.map(chat => ({
          _id: chat.UniqueId,
          createdAt: new Date(chat.CreatedOn),
          type: 'text',
          text: chat.ToStringText,
          user: {
            _id: chat.CoworkerId,
            // avatar: require('../../assets/images/HeadPhoneResolved.png'),
          },
        }));

        // Reverse the order of messages
        const reversedMessages = newMessages.reverse();

        // Filter out duplicate messages
        const filteredMessages = reversedMessages.filter(newMsg => {
          return !messages.some(msg => msg._id === newMsg._id);
        });

        // Append the new messages to the existing chat
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, filteredMessages),
        );

        isMessagesAppendedRef.current = true;
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error while getting chat list: ', error);
      setError('Error while getting chat list.');
    }
  };

  //* Send Message API
  const sendMessageApi = async (id, text, token) => {
    try {
      setIsLoading(true);
      const formattedData = {
        token,
        id,
        text,
      };
      const response = await dispatch(SendMessage(formattedData)).unwrap();
      console.log('API Response: ', response);
      getChatListApi();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error while sending message: ', error);
      setError('Error while sending message.');
    }
  };

  useEffect(() => {
    if (isInitialLoad) {
      getChatListApi();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  //* Append Passed Data into Chat
  useEffect(() => {
    if (!isMessagesAppendedRef.current) {
      const newMessages = [
        {
          _id: uuid.v4(),
          createdAt: CreatedOn,
          type: 'text',
          text: MessageText,
          user: {_id: ownId},
        },
        {
          _id: uuid.v4(),
          createdAt: CreatedOn,
          type: 'image',
          images: [],
          user: {_id: ownId},
        },
      ];

      if (typeof prId !== 'undefined') {
        const imageLink = `https://nexudus.spaces.nexudus.com//en/content/HelpDeskFile/?id=${prId}&h=1024`;

        fetch(imageLink)
          .then(response => {
            if (response.status === 200) {
              newMessages[1].images = [imageLink];
            }
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
      }

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
      isMessagesAppendedRef.current = true;
    }
  }, [CreatedOn, MessageText, prId]);

  const onSend = useCallback(
    (messages = []) => {
      sendMessageApi(route.params.item.Id, messages[0].text, token);
      setText('');
    },
    [route.params.item.Id, sendMessageApi, token],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    //* Reset isInitialLoad to allow appending new messages
    setIsInitialLoad(true);
    getChatListApi().finally(() => {
      setRefreshing(false);
    });
  };

  const RenderChatFooter = () => (
    <View>
      <Txt style={styles.footerDefTxt}>{'Resolved on'}</Txt>
      <Txt style={styles.footerDefTxt}>{moment().format('D MMM YY, ha')}</Txt>
    </View>
  );
  const RenderChatHeader = () => {
    return (
      <View style={{marginVertical: AppTheme.SPACINGS.MARGINS.M5}}>
        <Txt style={styles.footerDefTxt}>{'Help Requested'}</Txt>
        <Txt style={styles.footerDefTxt}>
          {moment(CreatedOn).format('D MMM YY, ha')}
        </Txt>
      </View>
    );
  };
  const RenderHeaderRightComp = (
    <View
      style={[
        styles.renderRightContainer,
        {backgroundColor: Closed ? '#35D7A1' : '#F99B1C'},
      ]}>
      <Txt style={styles.renderRightText}>{Closed ? 'Closed' : 'Open'}</Txt>
    </View>
  );

  return (
    <Frame
      screenTitle={'Meeting Room'}
      style={styles.container}
      // mode="View"
      renderRightComp={RenderHeaderRightComp}>
      <RenderChatHeader />
      <GiftedChat
        alignTop
        messages={messages}
        onSend={message => {
          onSend([{...message[0], text, type: 'text'}]);
        }}
        user={{
          _id: ownId,
        }}
        listViewProps={{
          style: styles.scrollContainer,
          // refreshControl: (
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={handleRefresh}
          //   />
          // ),
          showsVerticalScrollIndicator: false,
        }}
        renderBubble={data => (
          <RenderBubble
            bubbleProps={data}
            setIsImageVisible={setIsImageVisible}
            setImagePath={setImagePath}
          />
        )}
        renderInputToolbar={data => {
          return (
            <>
              {!Closed ? (
                <GiftedChatInput
                  isLoading={isLoading}
                  text={text}
                  setText={setText}
                  data={data}
                />
              ) : null}
            </>
          );
        }}
        renderChatFooter={Closed ? RenderChatFooter : null}
        renderAvatar={() => {
          return (
            <View
              style={{
                backgroundColor: AppTheme.COLORS.chatBgLight,
                padding: 4,
                borderRadius: 100 / 2,
              }}>
              <HelpDeskIcon
                micColor={!Closed ? '#F99B1C' : '#35D7A1'}
                color={AppTheme.COLORS.wrapperDarkModeBg}
              />
            </View>
          );
        }}
      />

      {/* On Press View Image */}
      <ImageView
        images={[{uri: ImagePath}]}
        doubleTapToZoomEnabled={true}
        imageIndex={0}
        visible={isImageVisible}
        onRequestClose={() => {
          setIsImageVisible(false);
          setImagePath('');
        }}
      />
    </Frame>
  );
}

ReportSummaryScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({}),
    }),
  }),
};

ReportSummaryScreen.defaultProps = {
  route: {
    params: {
      item: {},
    },
  },
};
