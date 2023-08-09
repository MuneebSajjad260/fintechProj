import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput as RNTextInput,
  Text,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '@config';
import styles from './text-input.style';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AppTheme } from '../../theme';
class TextInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      isSecureTextEntry: props.password,
    };
  }

  render() {
    const {
      error,
      password,
      label,
      value,
      applyField,
      bottomSheet,
      editable,
      ...rest
    } = this.props;

    return (
      <View style={styles.container}>

        {label ? <Text style={[styles.label, { ...this.props.styleLabel }]}>{label}</Text> : null}
        <TouchableOpacity
          style={[
            styles.inputContainer,
            error ? [styles.errorContainer,{ ...this.props.errorContainer}] : {},
            applyField ? styles.applyInputContainer : null,
            { ...this.props.styleInputContainer }
          ]}
          onPress={() => this.inputRef.focus()}
          activeOpacity={1}
        >

          {applyField ? (
            bottomSheet ?
              <BottomSheetTextInput
                {...rest}
                ref={ref => {
                  this.inputRef = ref;
                }}
                style={[styles.input, { ...this.props.styleInputText }]}
                value={value}
                onChangeText={this.props.onChangeText}
                editable={this.props.editable}
                onSelectionChange={this.props.onSelectionChange}
                onFocus={this.props.onFocus}
                onSubmitEditing={this.props.onSubmitEditing}
                placeholderTextColor={COLOR.TEXT_INPUT_PLACEHOLDER}
                secureTextEntry={this.state.isSecureTextEntry}
                accessibilityLabel={this.props.accessibilityLabel}
              />
              :
              <RNTextInput
                {...rest}
                ref={ref => {
                  this.inputRef = ref;
                }}
                multiline
                style={[applyField ? styles.applyInput : [styles.input, { ...this.props.styleInputText }]]}
                value={value}
                onChangeText={this.props.onChangeText}
                editable={this.props.editable}
                onSelectionChange={this.props.onSelectionChange}
                onFocus={this.props.onFocus}
                onSubmitEditing={this.props.onSubmitEditing}
                placeholderTextColor={COLOR.TEXT_INPUT_PLACEHOLDER}
                secureTextEntry={this.state.isSecureTextEntry}
                accessibilityLabel={this.props.accessibilityLabel}
              />
          ) : (
            bottomSheet ?
              <BottomSheetTextInput
                {...rest}
                ref={ref => {
                  this.inputRef = ref;
                }}
                style={styles.input}
                value={value}
                onChangeText={this.props.onChangeText}
                editable={this.props.editable}
                onSelectionChange={this.props.onSelectionChange}
                onFocus={this.props.onFocus}
                onSubmitEditing={this.props.onSubmitEditing}
                placeholderTextColor={COLOR.TEXT_INPUT_PLACEHOLDER}
                secureTextEntry={this.state.isSecureTextEntry}
                accessibilityLabel={this.props.accessibilityLabel}
              />
              :
              <RNTextInput
                {...rest}
                ref={ref => {
                  this.inputRef = ref;
                }}
                style={[styles.input, { ...this.props.styleInputText }]}
                value={value}
                onChangeText={this.props.onChangeText}
                editable={this.props.editable}
                onSelectionChange={this.props.onSelectionChange}
                onFocus={this.props.onFocus}
                onSubmitEditing={this.props.onSubmitEditing}
                placeholderTextColor={COLOR.TEXT_INPUT_PLACEHOLDER}
                secureTextEntry={this.state.isSecureTextEntry}
                accessibilityLabel={this.props.accessibilityLabel}
              />
          )}

          {password ? (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isSecureTextEntry: !this.state.isSecureTextEntry,
                })
              }>
              {this.state.isSecureTextEntry ?
                <Entypo
                  name={'eye-with-line'}
                  size={26}
                  solid
                  color={AppTheme.COLORS.black}
                  style={styles.leftIcon}
                />
                :
                <Entypo
                  name={'eye'}
                  size={26}
                  solid
                  color={AppTheme.COLORS.black}
                  style={styles.leftIcon}
                />
              }
            </TouchableOpacity>
          ) : null}
          {/* {error ? (
            <View style={styles.errorIcon}>
              <Icon
                name={"exclamation"}
                size={30}
                solid
                color={AppTheme.COLORS.white}
              // style={styles.leftIcon}
              />
            </View>
          ) : null} */}
        </TouchableOpacity>

        {error && (
          <View style={styles.errorMessageContainer}>
            <View style={styles.allignInRow}>
              <MaterialIcons
                name={'error'}
                size={14}
                color={AppTheme.COLORS.red}
                style={styles.leftIcon}
              />
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
          </View>
        )}

      </View>
    );
  }
}

export default TextInput;
