import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import ColorPickerModal from './ColorPickerModal';

class LightTherapy extends Component {
  state = {
    backgroundColor: '#B0E2FF',
    modalVisible: false,
  };

  colorSelect = (color) => {
    this.setState({ backgroundColor: color });
  }

  cogPress = () => {
    if (this.state.modalVisible) {
      this._hideModal();
    } else {
      this._showModal();
    }
  }

  _showModal = () => {
    this.setState({ modalVisible: true });
  }

  _hideModal = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const statusBar = Platform.select({
      ios: <StatusBar barStyle='light-content' />,
      android: <StatusBar backgroundColor={this.state.backgroundColor} />,
    });
    return (
      <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
        {statusBar}

        <Modal
          isVisible={this.state.modalVisible}
          onRequestClose={this._hideModal}
          backdropOpacity={0.7}
          style={styles.modal}
        >
          <ColorPickerModal
            color={this.state.backgroundColor}
            colorSelect={this.colorSelect}
            togglePress={this.cogPress}
          />
        </Modal>

        <View style={styles.settingsBar}>
          <Icon.Button
            size={28}
            name="cog"
            backgroundColor={'rgba(0,0,0,0)'}
            color={'rgba(200, 200, 200, 0.5)'}
            onPress={this.cogPress}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  settingsBar: {
    alignSelf: 'flex-end',
    padding: 15,
  },
});

export default LightTherapy;
