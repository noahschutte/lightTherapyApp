import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

class ColorPickerModal extends Component {
  state = {
    selectedColor: null,
  }
  onColorChange = (color) => {
    this.setState({ selectedColor: fromHsv(color) });
  }
  doneButton = () => {
    this.props.togglePress();
    this.props.colorSelect(this.state.selectedColor ? this.state.selectedColor : this.props.color);
  }
  render() {
      ColorPickerModal.propTypes = {
        colorSelect: PropTypes.func,
        color: PropTypes.string,
        togglePress: PropTypes.func,
      }
    return (
      <View style={[styles.container, { backgroundColor: this.state.selectedColor ? this.state.selectedColor : this.props.color }]}>
        <ColorPicker
          onColorSelected={null}
          style={{ flex: 9, width: 300 }}
          onColorChange={this.onColorChange}
          defaultColor={this.props.color}
        />
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.button} onPress={this.props.togglePress}>
            <Text style={styles.text} >Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.doneButton}>
            <Text style={styles.text} >Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 25,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  }
};

export default ColorPickerModal;
