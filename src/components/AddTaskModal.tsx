import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Modal, Text, TextInput, withTheme} from 'react-native-paper';
import {AppThemeType} from '../../App';

const deviceheight = Dimensions.get('window').height;

interface IProps {
  visible: boolean;
  setVisible: Function;
  theme: AppThemeType;
  onAdd: (task: ITask) => void;
}

interface ITask {
  title: string;
  description: string;
  status?: boolean;
}

const MyComponent = ({visible, setVisible, theme, onAdd}: IProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [descripError, setDescripError] = useState<string>('');

  const hideModal = () => setVisible(false);
  const checkTaskInput = () => {
    if (!title.trim()) {
      setTitleError('Please Enter Title');
      return;
    }

    if (!description.trim()) {
      setDescripError('Please Enter The Description');
      return;
    } else {
      setTitleError('');
      setDescripError('');
      onAdd({title: title, description: description});
    }
  };
  return (
    <>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        //  contentContainerStyle={containerStyle}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: deviceheight,
            backgroundColor: theme.colors.modal,
            padding: 20,
            width: '100%',
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
          }}>
          <Text
            variant="headlineSmall"
            style={{color: theme.colors.text, marginTop: 8}}>
            Add Task
          </Text>
          <TextInput
            placeholder="Add Task"
            //theme={{colors: {primary: 'white'}}}
            placeholderTextColor={theme.colors.text}
            textColor="white"
            mode="outlined"
            outlineColor={theme.colors.text}
            selectionColor={theme.colors.text}
            activeOutlineColor={theme.colors.text}
            onChangeText={(input: string) => setTitle(input)}
            style={{
              height: 50,
              backgroundColor: theme.colors.modal,
              marginTop: 8,
            }}
          />
          <Text style={styles.error}>{titleError}</Text>
          <Text
            variant="headlineSmall"
            style={{color: theme.colors.text, marginTop: 8}}>
            Description
          </Text>
          <TextInput
            placeholder="Add description here"
            placeholderTextColor={theme.colors.text}
            mode="outlined"
            outlineColor={theme.colors.text}
            textColor={theme.colors.text}
            selectionColor={theme.colors.text}
            activeOutlineColor={theme.colors.text}
            multiline={true}
            numberOfLines={3}
            onChangeText={(input: string) => setDescription(input)}
            style={{
              height: 100,
              backgroundColor: theme.colors.modal,
              marginTop: 8,
            }}
          />
          <Text style={styles.error}>{descripError}</Text>
          <Button
            mode="elevated"
            buttonColor={theme.colors.button}
            textColor={theme.colors.text}
            labelStyle={{fontSize: 20}}
            onPress={checkTaskInput}
            style={{paddingVertical: 6, marginTop: 50}}>
            ADD
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 2,
  },
});
export default withTheme(MyComponent);
